import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskName = '';
  taskDueDate = '';
  taskPriority: 'low' | 'medium' | 'high' = 'low';

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    const newTask = new Task(
      Date.now(),
      this.taskName,
      new Date(this.taskDueDate),
      'pending',
      this.taskPriority
    );
    this.taskService.addTask(newTask);
    this.taskName = '';
    this.taskDueDate = '';
    this.taskPriority = 'low';
  }
}
