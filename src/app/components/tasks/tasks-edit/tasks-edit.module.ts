import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { TasksEditRoutingModule } from './tasks-edit-routing.module';
import { TasksEditComponent } from './tasks-edit.component';
import { FabButtonModule } from '../../shared/fab-button/fab-button.module';
import { Dialog2FieldsModule } from '../../shared/dialog-2-fields/dialog-2-fields.module';

@NgModule({
  declarations: [TasksEditComponent],
  imports: [
    CommonModule,
    TasksEditRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    FabButtonModule,
    Dialog2FieldsModule
  ],
  exports: [TasksEditComponent],
})
export class TasksEditModule { }
