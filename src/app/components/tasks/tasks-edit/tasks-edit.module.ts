import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { TasksEditRoutingModule } from './tasks-edit-routing.module';
import { TasksEditComponent } from './tasks-edit.component';
import { FabButtonModule } from '../../shared/fab-button/fab-button.module';
import { SubtaskListModule } from '../subtask-list/subtask-list.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { ItemTitleDescModule } from '../../shared/item-title-desc/item-title-desc.module';
import { NoDataBoxModule } from '../../shared/no-data-box/no-data-box.module';
import { ItemContainerModule } from '../../shared/directives/item-container/item-container.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskEditMenuComponent } from './task-edit-menu/task-edit-menu.component';

@NgModule({
  declarations: [TasksEditComponent, TaskEditMenuComponent],
  imports: [
    CommonModule,
    TasksEditRoutingModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
    FabButtonModule,
    SubtaskListModule,
    ItemTitleDescModule,
    ItemContainerModule,
    NoDataBoxModule,
    FontAwesomeModule
  ],
  exports: [TasksEditComponent],
  entryComponents: [TaskEditMenuComponent]
})
export class TasksEditModule { }
