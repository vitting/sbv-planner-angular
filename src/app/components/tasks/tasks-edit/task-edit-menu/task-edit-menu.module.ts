import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskEditMenuComponent } from './task-edit-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [TaskEditMenuComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatBottomSheetModule
  ],
  exports: [TaskEditMenuComponent],
  entryComponents: [TaskEditMenuComponent]
})
export class TaskEditMenuModule { }
