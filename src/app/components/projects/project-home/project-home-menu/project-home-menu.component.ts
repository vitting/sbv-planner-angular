import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export enum ProjectHomeMenuResult {
  joinProject,
  newProject,
  newTemplate
}

@Component({
  selector: 'app-project-home-menu',
  templateUrl: './project-home-menu.component.html',
  styleUrls: ['./project-home-menu.component.scss']
})
export class ProjectHomeMenuComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ProjectHomeMenuComponent>) { }

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
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
