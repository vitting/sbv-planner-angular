import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [CheckboxComponent]
})
export class CheckboxModule { }
