import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FabMenuButtonComponent } from './fab-menu-button.component';



@NgModule({
  declarations: [FabMenuButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [FabMenuButtonComponent]
})
export class FabMenuButtonModule { }
