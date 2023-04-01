import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.css']
})
export class TaskFilterComponent {
  @Output() statusFilter = new EventEmitter<string>();
  @Output() dueDateFilter = new EventEmitter<string>();
  @Output() sortBy = new EventEmitter<string>();

  onStatusChange(event: any): void {
    const value = event.target.value;
    this.statusFilter.emit(value);
  }
  
  onDueDateChange(event: any): void {
    const value = event.target.value;
    this.dueDateFilter.emit(value);
  }
  
  onSortByChange(event: any): void {
    const value = event.target.value;
    this.sortBy.emit(value);
  }
}
  

