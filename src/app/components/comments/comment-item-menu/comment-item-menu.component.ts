import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export enum CommentItemMenuResult {
  edit,
  delete
}

@Component({
  selector: 'app-comment-item-menu',
  templateUrl: './comment-item-menu.component.html',
  styleUrls: ['./comment-item-menu.component.scss']
})
export class CommentItemMenuComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<CommentItemMenuComponent>) { }

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
