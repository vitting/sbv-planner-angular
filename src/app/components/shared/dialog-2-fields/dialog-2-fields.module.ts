import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog2FieldsComponent } from './dialog-2-fields.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [Dialog2FieldsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [Dialog2FieldsComponent],
  entryComponents: [Dialog2FieldsComponent]
})
export class Dialog2FieldsModule { }
