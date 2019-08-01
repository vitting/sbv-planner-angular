import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export enum TaskEditMenuResult {
  edit,
  delete
}

@Component({
  selector: 'app-task-edit-menu',
  templateUrl: './task-edit-menu.component.html'
})
export class TaskEditMenuComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<TaskEditMenuComponent>) { }

  ngOnInit() {
  }

  action(event: MouseEvent, action: string): void {
    let result = TaskEditMenuResult.edit;
    if (action === "delete") {
      result = TaskEditMenuResult.delete;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
