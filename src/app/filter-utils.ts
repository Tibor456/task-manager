import { Task } from './task.model';

export class FilterUtils {
  static applyStatusFilter(tasks: Task[], statusFilter: string): Task[] {
    if (statusFilter === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.status === statusFilter);
  }

  static applyDueDateFilter(tasks: Task[], dueDateFilter: string): Task[] {
    const today = new Date();
    switch (dueDateFilter) {
      // ... (implement filtering logic for each case)
    }
    return tasks;
  }

  static applySortBy(tasks: Task[], sortCriteria: string): Task[] {
    return tasks.sort((a, b) => {
      // ... (implement sorting logic for each criterion)
    });
  }
}