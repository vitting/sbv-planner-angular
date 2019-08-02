import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { RadioModule } from '../../shared/radio/radio.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemContainerModule } from '../directives/item-container/item-container.module';


@NgModule({
  declarations: [FilterComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RadioModule,
    ItemContainerModule
  ],
  exports: [FilterComponent]
})
export class FilterModule { }
