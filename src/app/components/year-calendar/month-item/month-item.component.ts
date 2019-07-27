import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
@Component({
  selector: 'app-month-item',
  templateUrl: './month-item.component.html',
  styleUrls: ['./month-item.component.scss']
})
export class MonthItemComponent implements OnInit {
  @Input() monthNumber = 0;
  @Input() highlightCurrentMonth = false;
  @Input() currentMonth = 0;
  itemClass = {};
  highligtMonth = false;
  monthName: string;

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    if (this.highlightCurrentMonth) {
      this.highligtMonth = this.monthNumber === this.currentMonth;
    }

    this.monthName = this.calendarService.getMonthName(this.monthNumber);
    const className = 'month-' + this.monthNumber + '-container';
    this.itemClass[className] = true;
    this.itemClass['month-active'] = this.highligtMonth;
  }

}
