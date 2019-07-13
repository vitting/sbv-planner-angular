import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentItemComponent } from './comment-item.component';
import { ItemContainerModule } from '../../shared/directives/item-container/item-container.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Dialog1FieldModule } from '../../shared/dialog-1-field/dialog-1-fieldmodule';
import { MomentModule } from 'ngx-moment';



@NgModule({
  declarations: [CommentItemComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MomentModule,
    ItemContainerModule,
    Dialog1FieldModule
  ],
  exports: [CommentItemComponent]
})
export class CommentItemModule { }
