import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectEditRoutingModule } from './project-edit-routing.module';
import { ProjectEditComponent } from './project-edit.component';
import { FabButtonModule } from '../../shared/fab-button/fab-button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { ProjectListItemModule } from '../project-list-item/project-list-item.module';

@NgModule({
  declarations: [ProjectEditComponent],
  imports: [
    CommonModule,
    ProjectEditRoutingModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatListModule,
    FabButtonModule,
    ProjectListItemModule
  ],
  exports: [ProjectEditComponent]
})
export class ProjectEditModule { }
