import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListItemComponent } from './task-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemContainerModule } from '../../shared/directives/item-container/item-container.module';
import { ItemTitleDescModule } from '../../shared/item-title-desc/item-title-desc.module';
import { SubtaskListModule } from '../subtask-list/subtask-list.module';
import { TasksMenuModule } from '../tasks-menu/tasks-menu.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [TaskListItemComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ItemContainerModule,
    ItemTitleDescModule,
    SubtaskListModule,
    TasksMenuModule
  ],
  exports: [TaskListItemComponent]
})
export class TaskListItemModule { }
