import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProjectMenuComponent } from '../../project-menu/project-menu.component';

export enum ProjectEditItemResult {
  edit,
  delete
}

@Component({
  selector: 'app-project-edit-item-menu',
  templateUrl: './project-edit-item-menu.component.html',
  styleUrls: ['./project-edit-item-menu.component.scss']
})
export class ProjectEditItemMenuComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ProjectMenuComponent>) { }

  ngOnInit() {
  }

  action(event: MouseEvent, action: string) {
    let result = ProjectEditItemResult.edit;

    if (action === "delete") {
      result = ProjectEditItemResult.delete;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
