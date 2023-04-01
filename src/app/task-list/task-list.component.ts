import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  sortCriteria = 'dueDate';

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  private isKeyOfTask(value: string): value is keyof Task {
    return ['id', 'name', 'dueDate', 'status', 'priority'].includes(value);
  }

  applyStatusFilter(status: string): void {
    this.filteredTasks = this.tasks.filter(task => task.status === status);
  }

  applyDueDateFilter(dateString: string): void {
    const date = new Date(dateString);
    this.filteredTasks = this.tasks.filter(task => task.dueDate.getTime() === date.getTime());
  }

  applySortBy(sortCriteria: string): void {
    if (this.isKeyOfTask(sortCriteria)) {
      this.sortCriteria = sortCriteria;
      this.filteredTasks = this.filteredTasks.sort((a, b) => {
        if (a[sortCriteria] < b[sortCriteria]) {
          return -1;
        } else if (a[sortCriteria] > b[sortCriteria]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  markAsComplete(task: Task): void {
    task.status = 'completed';
    this.taskService.updateTask(task);
  }

  editTask(task: Task): void {
    this.taskService.editTask(task.id);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.filteredTasks = this.filteredTasks.filter(task => task.id !== taskId);
    });
  }
}
