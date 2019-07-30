import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListItemComponent } from './task-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemTitleDescModule } from '../../shared/item-title-desc/item-title-desc.module';
import { SubtaskListModule } from '../subtask-list/subtask-list.module';
import { ItemContainerModule } from '../../shared/directives/item-container/item-container.module';
import { MatDividerModule } from '@angular/material/divider';
import { TasksMenuComponent } from './tasks-menu/tasks-menu.component';



@NgModule({
  declarations: [TaskListItemComponent, TasksMenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ItemContainerModule,
    ItemTitleDescModule,
    SubtaskListModule
  ],
  exports: [TaskListItemComponent]
})
export class TaskListItemModule { }
