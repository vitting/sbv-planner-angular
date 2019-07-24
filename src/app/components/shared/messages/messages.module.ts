import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MatListModule
  ],
  exports: [MessagesComponent]
})
export class MessagesModule { }
