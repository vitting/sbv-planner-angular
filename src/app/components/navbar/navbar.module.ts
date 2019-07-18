import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
