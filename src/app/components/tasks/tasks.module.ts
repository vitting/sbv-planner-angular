import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { MatListModule } from '@angular/material/list';
import { ItemTitleDescModule } from '../shared/item-title-desc/item-title-desc.module';
import { SubtaskListModule } from './subtask-list/subtask-list.module';
import { CheckboxModule } from '../shared/checkbox/checkbox.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatListModule,
    ItemContainerModule,
    ItemTitleDescModule,
    SubtaskListModule,
    CheckboxModule
  ],
  exports: [TasksComponent]
})
export class TasksModule { }
