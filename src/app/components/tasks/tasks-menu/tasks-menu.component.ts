import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export enum TasksMenuResult {
  addAndRemove,
  delete,
  markAllSubTasksCompleted
}

@Component({
  selector: 'app-tasks-menu',
  templateUrl: './tasks-menu.component.html',
  styleUrls: ['./tasks-menu.component.scss']
})
export class TasksMenuComponent implements OnInit {
  constructor(private bottomSheetRef: MatBottomSheetRef<TasksMenuComponent>) { }

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
