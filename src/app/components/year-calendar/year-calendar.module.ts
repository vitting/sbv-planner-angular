import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YearCalendarRoutingModule } from './year-calendar-routing.module';
import { YearCalendarComponent } from './year-calendar.component';
import { MonthItemComponent } from './month-item/month-item.component';
import { MonthTaskComponent } from './month-task/month-task.component';
import { MomentModule } from 'ngx-moment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [YearCalendarComponent, MonthItemComponent, MonthTaskComponent],
  imports: [
    CommonModule,
    MomentModule,
    FontAwesomeModule,
    YearCalendarRoutingModule
  ],
  exports: [YearCalendarComponent, MonthItemComponent, MonthTaskComponent]
})
export class YearCalendarModule { }
