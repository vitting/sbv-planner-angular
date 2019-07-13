import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentItemMenuComponent } from './comment-item-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [CommentItemMenuComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [CommentItemMenuComponent],
  entryComponents: [CommentItemMenuComponent]
})
export class CommentItemMenuModule { }
