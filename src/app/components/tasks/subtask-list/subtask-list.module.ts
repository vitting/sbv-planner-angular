import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtaskListComponent } from './subtask-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Dialog1FieldModule } from '../../shared/dialog-1-field/dialog-1-fieldmodule';
import { DialogConfirmModule } from '../../shared/dialog-confirm/dialog-confirm.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SubtaskEditListItemModule } from './subtask-edit-list-item/subtask-edit-list-item.module';



@NgModule({
  declarations: [SubtaskListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SubtaskEditListItemModule,
    Dialog1FieldModule,
    DialogConfirmModule
  ],
  exports: [SubtaskListComponent]
})
export class SubtaskListModule { }
