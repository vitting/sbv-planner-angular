import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YearCalendarRoutingModule } from './year-calendar-routing.module';
import { YearCalendarComponent } from './year-calendar.component';


@NgModule({
  declarations: [YearCalendarComponent],
  imports: [
    CommonModule,
    YearCalendarRoutingModule
  ],
  exports: [YearCalendarComponent]
})
export class YearCalendarModule { }
