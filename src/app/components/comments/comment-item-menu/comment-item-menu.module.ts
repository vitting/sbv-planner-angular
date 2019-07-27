import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentItemMenuComponent } from './comment-item-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [CommentItemMenuComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    FontAwesomeModule
  ],
  exports: [CommentItemMenuComponent],
  entryComponents: [CommentItemMenuComponent]
})
export class CommentItemMenuModule { }
