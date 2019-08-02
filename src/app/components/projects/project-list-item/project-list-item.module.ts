import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectListItemComponent } from './project-list-item.component';
import { UsersListModule } from '../../shared/users-list/users-list.module';
import { ItemTitleDescModule } from '../../shared/item-title-desc/item-title-desc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectDetailsEditComponent } from './project-details-edit/project-details-edit.component';
import { ItemContainerModule } from '../../shared/directives/item-container/item-container.module';
import { TaskListItemModule } from '../../tasks/task-list-item/task-list-item.module';

@NgModule({
  declarations: [ProjectListItemComponent, ProjectDetailsComponent, ProjectDetailsEditComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MomentModule,
    UsersListModule,
    ItemContainerModule,
    ItemTitleDescModule,
    TaskListItemModule
  ],
  exports: [ProjectListItemComponent]
})
export class ProjectListItemModule { }
