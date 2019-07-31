import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatSlideToggleModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    ItemContainerModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }
