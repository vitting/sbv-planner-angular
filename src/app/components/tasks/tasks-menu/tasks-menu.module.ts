import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksMenuComponent } from './tasks-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';



@NgModule({
  declarations: [TasksMenuComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatBottomSheetModule
  ],
  exports: [TasksMenuComponent],
  entryComponents: [TasksMenuComponent]
})
export class TasksMenuModule { }
