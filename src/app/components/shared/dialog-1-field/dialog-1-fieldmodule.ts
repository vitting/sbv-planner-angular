import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog1FieldComponent } from './dialog-1-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [Dialog1FieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [Dialog1FieldComponent],
  entryComponents: [Dialog1FieldComponent]
})
export class Dialog1FieldModule { }
