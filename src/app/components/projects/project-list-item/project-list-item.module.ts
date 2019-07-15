import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectListItemComponent } from './project-list-item.component';
import { ItemContainerModule } from '../../shared/directives/item-container/item-container.module';
import { UsersListModule } from '../../shared/users-list/users-list.module';
import { ProjectDetailsModule } from './project-details/project-details.module';
import { ItemTitleDescModule } from '../../shared/item-title-desc/item-title-desc.module';
import { ProjectDetailsEditModule } from './project-details-edit/project-details-edit.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ProjectListItemComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRippleModule,
    ItemContainerModule,
    UsersListModule,
    ProjectDetailsModule,
    ProjectDetailsEditModule,
    ItemTitleDescModule
  ],
  exports: [ProjectListItemComponent]
})
export class ProjectListItemModule { }
