import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { CommentItemModule } from './comment-item/comment-item.module';
import { FabButtonModule } from '../shared/fab-button/fab-button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CommentItemMenuModule } from './comment-item-menu/comment-item-menu.module';


@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    CommentItemModule,
    FabButtonModule,
    CommentItemMenuModule
  ],
  exports: [CommentsComponent]
})
export class CommentsModule { }
