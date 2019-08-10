import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { MatListModule } from '@angular/material/list';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { MomentModule } from 'ngx-moment';
import { NameOfUserPipe } from '../shared/pipes/name-of-user.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FilterModule } from '../shared/filter/filter.module';
import { NoDataBoxModule } from '../shared/no-data-box/no-data-box.module';

@NgModule({
  declarations: [LogsComponent, NameOfUserPipe],
  imports: [
    CommonModule,
    LogsRoutingModule,
    MatListModule,
    MatTooltipModule,
    MomentModule,
    FontAwesomeModule,
    NoDataBoxModule,
    ItemContainerModule,
    FilterModule
  ],
  exports: [LogsComponent]
})
export class LogsModule { }
