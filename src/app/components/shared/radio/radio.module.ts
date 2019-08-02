import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [RadioComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [RadioComponent]
})
export class RadioModule { }
