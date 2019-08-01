import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/services/auth.service';

export enum ProjectHomeItemMenuResult {
  editProject,
  removeFromProject,
  gotoTasks,
  gotoComments
}

@Component({
  selector: 'app-project-home-item-menu',
  templateUrl: './project-home-item-menu.component.html'
})
export class ProjectHomeItemMenuComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public inEditMode: boolean,
    private bottomSheetRef: MatBottomSheetRef<ProjectHomeItemMenuComponent>,
    public authService: AuthService) { }

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
      case "removeFromProject":
        result = ProjectHomeItemMenuResult.removeFromProject;
        break;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
