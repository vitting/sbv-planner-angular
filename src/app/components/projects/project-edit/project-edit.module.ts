import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectEditRoutingModule } from './project-edit-routing.module';
import { ProjectEditComponent } from './project-edit.component';
import { FabButtonModule } from '../../shared/fab-button/fab-button.module';
import { MatListModule } from '@angular/material/list';
import { ProjectListItemModule } from '../project-list-item/project-list-item.module';
import { ProjectEditItemMenuComponent } from './project-edit-item-menu/project-edit-item-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoDataBoxModule } from '../../shared/no-data-box/no-data-box.module';

@NgModule({
  declarations: [ProjectEditComponent, ProjectEditItemMenuComponent],
  imports: [
    CommonModule,
    ProjectEditRoutingModule,
    MatListModule,
    FontAwesomeModule,
    FabButtonModule,
    ProjectListItemModule,
    NoDataBoxModule
  ],
  entryComponents: [ProjectEditItemMenuComponent],
  exports: [ProjectEditComponent, ProjectEditItemMenuComponent]
})
export class ProjectEditModule { }
