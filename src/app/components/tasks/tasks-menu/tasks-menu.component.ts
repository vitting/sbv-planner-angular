import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export enum TasksMenuResult {
  addAndRemove,
  delete
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
    if (action === "delete") {
      result = TasksMenuResult.delete;
    } else if (action === "addremove") {
      result = TasksMenuResult.addAndRemove;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
