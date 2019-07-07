import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListItemComponent } from './task-list-item.component';



@NgModule({
  declarations: [TaskListItemComponent],
  imports: [
    CommonModule
  ],
  exports: [TaskListItemComponent]
})
export class TaskListItemModule { }
