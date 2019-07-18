import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsEditComponent } from './project-details-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MomentModule } from 'ngx-moment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ProjectDetailsEditComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MomentModule
  ],
  exports: [ProjectDetailsEditComponent]
})
export class ProjectDetailsEditModule { }
