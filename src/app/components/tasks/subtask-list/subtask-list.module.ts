import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtaskListComponent } from './subtask-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubtaskListItemComponent } from './subtask-list-item/subtask-list-item.component';
import { CheckboxModule } from '../../shared/checkbox/checkbox.module';
import { UsersListModule } from '../../shared/users-list/users-list.module';



@NgModule({
  declarations: [SubtaskListComponent, SubtaskListItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CheckboxModule,
    UsersListModule
  ],
  exports: [SubtaskListComponent]
})
export class SubtaskListModule { }
