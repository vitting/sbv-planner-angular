import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { TasksEditRoutingModule } from './tasks-edit-routing.module';
import { TasksEditComponent } from './tasks-edit.component';
import { FabButtonModule } from '../../shared/fab-button/fab-button.module';
import { Dialog2FieldsModule } from '../../shared/dialog-2-fields/dialog-2-fields.module';
import { SubtaskListModule } from '../subtask-list/subtask-list.module';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { TaskEditMenuModule } from './task-edit-menu/task-edit-menu.module';
import { DialogConfirmModule } from '../../shared/dialog-confirm/dialog-confirm.module';
import { ItemContainerDirective } from '../../shared/directives/item-container/item-container.directive';
import { ItemContainerModule } from '../../shared/directives/item-container/item-container.module';
import { ItemTitleDescModule } from '../../shared/item-title-desc/item-title-desc.module';

@NgModule({
  declarations: [TasksEditComponent],
  imports: [
    CommonModule,
    TasksEditRoutingModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
    FabButtonModule,
    Dialog2FieldsModule,
    DialogConfirmModule,
    SubtaskListModule,
    TaskEditMenuModule,
    ItemContainerModule,
    ItemTitleDescModule
  ],
  exports: [TasksEditComponent],
})
export class TasksEditModule { }
