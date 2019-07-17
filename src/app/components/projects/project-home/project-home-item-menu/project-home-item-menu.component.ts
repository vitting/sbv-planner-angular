import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export enum ProjectHomeItemMenuResult {
  edit,
  delete
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
    let result = ProjectHomeItemMenuResult.edit;
    if (action === "delete") {
      result = ProjectHomeItemMenuResult.delete;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
