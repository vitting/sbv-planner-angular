import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { MatListModule } from '@angular/material/list';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';


@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    MatListModule,
    ItemContainerModule
  ],
  exports: [LogsComponent]
})
export class LogsModule { }
