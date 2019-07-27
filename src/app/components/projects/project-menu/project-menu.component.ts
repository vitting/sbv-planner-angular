import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

export enum CommentItemMenuResult {
  edit,
  delete
}

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.scss']
})
export class ProjectMenuComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ProjectMenuComponent>, private router: Router) { }

  ngOnInit() {
  }

  action(event: MouseEvent, action: string) {
    let result = CommentItemMenuResult.edit;

    if (action === "delete") {
      result = CommentItemMenuResult.delete;
    }

    this.bottomSheetRef.dismiss({
      action: result
    });
    event.preventDefault();
  }
}
