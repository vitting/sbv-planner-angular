import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/services/auth.service';

export enum ProjectHomeMenuResult {
  joinProject,
  newProject,
  newTemplate,
  newProjectFromTemplate
}

@Component({
  selector: 'app-project-home-menu',
  templateUrl: './project-home-menu.component.html'
})
export class ProjectHomeMenuComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProjectHomeMenuComponent>,
    public authService: AuthService) { }

  ngOnInit() {
  }

  action(event: MouseEvent, action: string): void {
    let result: ProjectHomeMenuResult;
    switch (action) {
      case "joinProject":
        result = ProjectHomeMenuResult.joinProject;
        break;
      case "newProject":
        result = ProjectHomeMenuResult.newProject;
        break;
      case "newTemplate":
        result = ProjectHomeMenuResult.newTemplate;
        break;
      case "newProjectfromTemplate":
        result = ProjectHomeMenuResult.newProjectFromTemplate;
        break;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
