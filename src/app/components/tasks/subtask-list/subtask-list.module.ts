import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtaskListComponent } from './subtask-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Dialog1FieldModule } from '../../shared/dialog-1-field/dialog-1-fieldmodule';
import { DialogConfirmModule } from '../../shared/dialog-confirm/dialog-confirm.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SubtaskListItemModule } from './subtask-list-item/subtask-list-item.module';



@NgModule({
  declarations: [SubtaskListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SubtaskListItemModule,
    Dialog1FieldModule,
    DialogConfirmModule
  ],
  exports: [SubtaskListComponent]
})
export class SubtaskListModule { }
