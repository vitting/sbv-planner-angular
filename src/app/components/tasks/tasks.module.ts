import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MatListModule } from '@angular/material/list';
import { TaskListItemModule } from './task-list-item/task-list-item.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NoDataBoxModule } from '../shared/no-data-box/no-data-box.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatListModule,
    MatDialogModule,
    TaskListItemModule,
    NoDataBoxModule
  ],
  exports: [TasksComponent]
})
export class TasksModule { }
