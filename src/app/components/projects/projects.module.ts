import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { RouterModule } from '@angular/router';
import { ProjectListItemModule } from './project-list-item/project-list-item.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProjectsRoutingModule,
    MatListModule,
    ProjectListItemModule
  ],
  exports: [ProjectsComponent]
})
export class ProjectsModule { }
