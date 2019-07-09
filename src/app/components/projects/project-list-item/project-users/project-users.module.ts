import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectUsersComponent } from './project-users.component';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [ProjectUsersComponent],
  imports: [
    CommonModule,
    MatChipsModule
  ],
  exports: [ProjectUsersComponent]
})
export class ProjectUsersModule { }
