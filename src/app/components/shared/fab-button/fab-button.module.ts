import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FabButtonComponent } from './fab-button.component';



@NgModule({
  declarations: [FabButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [FabButtonComponent]
})
export class FabButtonModule { }
