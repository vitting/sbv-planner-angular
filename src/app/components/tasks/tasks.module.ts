import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MatListModule } from '@angular/material/list';
import { TaskListItemModule } from './task-list-item/task-list-item.module';
import { TasksMenuModule } from './tasks-menu/tasks-menu.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmModule } from '../shared/dialog-confirm/dialog-confirm.module';
import { NoDataBoxModule } from '../shared/no-data-box/no-data-box.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatListModule,
    MatDialogModule,
    FontAwesomeModule,
    TaskListItemModule,
    TasksMenuModule,
    DialogConfirmModule,
    NoDataBoxModule
  ],
  exports: [TasksComponent]
})
export class TasksModule { }
