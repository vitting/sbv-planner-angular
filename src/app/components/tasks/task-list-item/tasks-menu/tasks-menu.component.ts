import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

export enum TasksMenuResult {
  addAndRemove,
  delete,
  markAllSubTasksCompleted
}

export interface TasksMenuData {
  inEditMode: boolean;
  taskCompleted: boolean;
}

@Component({
  selector: 'app-tasks-menu',
  templateUrl: './tasks-menu.component.html',
  styleUrls: ['./tasks-menu.component.scss']
})
export class TasksMenuComponent implements OnInit {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: TasksMenuData, private bottomSheetRef: MatBottomSheetRef<TasksMenuComponent>) { }

  ngOnInit() {
  }

  action(event: MouseEvent, action: string): void {
    let result = TasksMenuResult.addAndRemove;
    switch (action) {
      case "delete":
        result = TasksMenuResult.delete;
        break;
      case "addremove":
        result = TasksMenuResult.addAndRemove;
        break;
      case "markAllSubTasksCompleted":
        result = TasksMenuResult.markAllSubTasksCompleted;
        break;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
