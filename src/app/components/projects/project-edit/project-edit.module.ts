import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectEditRoutingModule } from './project-edit-routing.module';
import { ProjectEditComponent } from './project-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProjectEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectEditRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule
  ],
  exports: [ProjectEditComponent]
})
export class ProjectEditModule { }
