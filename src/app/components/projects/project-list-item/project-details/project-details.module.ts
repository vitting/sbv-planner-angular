import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ProjectDetailsComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ProjectDetailsComponent]
})
export class ProjectDetailsModule { }
