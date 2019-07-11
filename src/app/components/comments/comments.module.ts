import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [CommentsComponent]
})
export class CommentsModule { }
