import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { MatListModule } from '@angular/material/list';
import { ItemTitleDescModule } from '../shared/item-title-desc/item-title-desc.module';
import { SubtaskListModule } from './subtask-list/subtask-list.module';
import { CheckboxModule } from '../shared/checkbox/checkbox.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskListItemModule } from './task-list-item/task-list-item.module';
import { TasksMenuModule } from './tasks-menu/tasks-menu.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmModule } from '../shared/dialog-confirm/dialog-confirm.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatListModule,
    MatDialogModule,
    TaskListItemModule,
    TasksMenuModule,
    DialogConfirmModule
  ],
  exports: [TasksComponent]
})
export class TasksModule { }
