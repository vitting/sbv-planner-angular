import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubtasksRoutingModule } from './subtasks-routing.module';
import { SubtasksComponent } from './subtasks.component';

@NgModule({
  declarations: [SubtasksComponent],
  imports: [
    CommonModule,
    SubtasksRoutingModule
  ],
  exports: [SubtasksComponent]
})
export class SubtasksModule { }
