import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private editingTaskId: number | null = null;
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.saveToLocalStorage();
    this.tasksSubject.next(this.tasks);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveToLocalStorage();
      this.editingTaskId = null;
      this.tasksSubject.next(this.tasks);
    }
  }

  deleteTask(taskId: number): Observable<void> {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveToLocalStorage();
    this.editingTaskId = null;
    this.tasksSubject.next(this.tasks);
    return of(undefined);
  }

  get editingTask(): Observable<Task | null> {
    if (this.editingTaskId === null) {
      return of(null);
    } else {
      const task = this.tasks.find(task => task.id === this.editingTaskId);
      return of(task || null);
    }
  }

  editTask(taskId: number): void {
    this.editingTaskId = taskId;
  }

  cancelEdit(): void {
    this.editingTaskId = null;
  }

  private loadFromLocalStorage(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.tasksSubject.next(this.tasks);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTaskById(taskId: number): Task | null {
    const task = this.tasks.find(task => task.id === taskId);
    return task ? { ...task } : null;
  }
}
