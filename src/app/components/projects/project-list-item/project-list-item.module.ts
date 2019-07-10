import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectListItemComponent } from './project-list-item.component';
import { ItemContainerModule } from '../../shared/directives/item-container/item-container.module';
import { ProjectUsersModule } from './project-users/project-users.module';
import { ProjectDetailsModule } from './project-details/project-details.module';
import { ItemTitleDescModule } from '../../shared/item-title-desc/item-title-desc.module';
import { ProjectDetailsEditModule } from './project-details-edit/project-details-edit.module';

@NgModule({
  declarations: [ProjectListItemComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ItemContainerModule,
    ProjectUsersModule,
    ProjectDetailsModule,
    ProjectDetailsEditModule,
    ItemTitleDescModule
  ],
  exports: [ProjectListItemComponent]
})
export class ProjectListItemModule { }
