import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { RouterModule } from '@angular/router';
import { ProjectListItemModule } from './project-list-item/project-list-item.module';
import { NoDataBoxModule } from '../shared/no-data-box/no-data-box.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProjectsRoutingModule,
    MatListModule,
    NoDataBoxModule,
    ProjectListItemModule
  ],
  exports: [ProjectsComponent]
})
export class ProjectsModule { }
