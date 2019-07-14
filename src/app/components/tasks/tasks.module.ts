import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatListModule,
    ItemContainerModule
  ],
  exports: [TasksComponent]
})
export class TasksModule { }
