import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsEditComponent } from './project-details-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MomentModule } from 'ngx-moment';



@NgModule({
  declarations: [ProjectDetailsEditComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MomentModule
  ],
  exports: [ProjectDetailsEditComponent]
})
export class ProjectDetailsEditModule { }
