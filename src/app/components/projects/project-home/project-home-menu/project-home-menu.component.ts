import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export enum ProjectHomeMenuResult {
  edit,
  delete
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
    let result = ProjectHomeMenuResult.edit;
    if (action === "delete") {
      result = ProjectHomeMenuResult.delete;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
