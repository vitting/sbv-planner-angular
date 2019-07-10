import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsEditComponent } from './project-details-edit.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ProjectDetailsEditComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ProjectDetailsEditComponent]
})
export class ProjectDetailsEditModule { }
