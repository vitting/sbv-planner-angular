import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtaskListComponent } from './subtask-list.component';



@NgModule({
  declarations: [SubtaskListComponent],
  imports: [
    CommonModule
  ],
  exports: [SubtaskListComponent]
})
export class SubtaskListModule { }
