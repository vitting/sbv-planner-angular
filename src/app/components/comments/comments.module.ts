import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FabButtonModule } from '../shared/fab-button/fab-button.module';
import { NoDataBoxModule } from '../shared/no-data-box/no-data-box.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentItemMenuComponent } from './comment-item-menu/comment-item-menu.component';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';

@NgModule({
  declarations: [CommentsComponent, CommentItemComponent, CommentItemMenuComponent],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MomentModule,
    ItemContainerModule,
    FabButtonModule,
    NoDataBoxModule,
    FontAwesomeModule,
  ],
  exports: [CommentsComponent],
  entryComponents: [CommentItemMenuComponent]
})
export class CommentsModule { }
