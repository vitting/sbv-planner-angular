import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
