import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task!: Task;
  @ViewChild('taskForm') taskForm!: NgForm;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskService.editingTask.subscribe(task => {
      if (task) {
        this.task = this.taskService.getTaskById(task.id)!;
        this.taskForm.setValue({
          name: this.task.name,
          dueDate: this.task.dueDate.toISOString().substring(0, 10),
          priority: this.task.priority,
          status: this.task.status
        });
      } else {
        this.task = null!;
      }
    });
  }
  
  onSave(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.task,
        name: this.taskForm.value.name,
        dueDate: new Date(this.taskForm.value.dueDate),
        priority: this.taskForm.value.priority,
        status: this.taskForm.value.status
      };
      this.taskService.updateTask(updatedTask);
      this.taskForm.resetForm();
      this.taskService.cancelEdit();
    }
  }
  

  onCancel(): void {
    this.taskService.cancelEdit();
  }
}
