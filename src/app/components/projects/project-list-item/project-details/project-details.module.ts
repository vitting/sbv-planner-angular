import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MomentModule } from 'ngx-moment';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ProjectDetailsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MomentModule
  ],
  exports: [ProjectDetailsComponent]
})
export class ProjectDetailsModule { }
