import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataBoxComponent } from './no-data-box.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NoDataBoxComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [NoDataBoxComponent]
})
export class NoDataBoxModule { }
