import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export enum ProjectHomeItemMenuResult {
  editProject,
  editTasks,
  gotoTasks,
  gotoComments
}

@Component({
  selector: 'app-project-home-item-menu',
  templateUrl: './project-home-item-menu.component.html',
  styleUrls: ['./project-home-item-menu.component.scss']
})
export class ProjectHomeItemMenuComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ProjectHomeItemMenuComponent>) { }

  ngOnInit() {
  }

  action(event: MouseEvent, action: string): void {
    let result = ProjectHomeItemMenuResult.gotoTasks;
    switch (action) {
      case "gotoTasks":
        result = ProjectHomeItemMenuResult.gotoTasks;
        break;
      case "gotoComments":
        result = ProjectHomeItemMenuResult.gotoComments;
        break;
      case "editProject":
        result = ProjectHomeItemMenuResult.editProject;
        break;
      case "editTasks":
        result = ProjectHomeItemMenuResult.editTasks;
        break;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
