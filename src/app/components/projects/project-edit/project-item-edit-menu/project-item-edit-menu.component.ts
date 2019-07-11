import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export enum ProjectEditMenuResult {
  edit,
  editTasks,
  delete
}

@Component({
  selector: 'app-project-item-edit-menu',
  templateUrl: './project-item-edit-menu.component.html',
  styleUrls: ['./project-item-edit-menu.component.scss']
})
export class ProjectItemEditMenuComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ProjectItemEditMenuComponent>) { }

  ngOnInit() {
  }

  action(event: MouseEvent, action: string): void {
    let result = ProjectEditMenuResult.edit;

    switch (action) {
      case "edit":
        result = ProjectEditMenuResult.edit;
        break;
      case "edittasks":
        result = ProjectEditMenuResult.editTasks;
        break;
      case "delete":
        result = ProjectEditMenuResult.delete;
        break;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
