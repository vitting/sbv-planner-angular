import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeComponent } from './project-home.component';
import { ProjectHomeRoutingModule } from './project-home-routing.module';
import { MatListModule } from '@angular/material/list';
import { ProjectListItemModule } from '../project-list-item/project-list-item.module';
import { FabButtonModule } from '../../shared/fab-button/fab-button.module';
@NgModule({
  declarations: [ProjectHomeComponent],
  imports: [
    CommonModule,
    ProjectHomeRoutingModule,
    MatListModule,
    ProjectListItemModule,
    FabButtonModule
  ],
  exports: [
    ProjectHomeComponent,
  ]
})
export class ProjectHomeModule { }
