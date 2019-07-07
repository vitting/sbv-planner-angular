import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DialogConfirmComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [DialogConfirmComponent],
  entryComponents: [DialogConfirmComponent]
})
export class DialogConfirmModule { }
