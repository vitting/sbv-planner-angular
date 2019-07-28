import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarItem } from 'src/app/models/calendar.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-month-item',
  templateUrl: './month-item.component.html',
  styleUrls: ['./month-item.component.scss']
})
export class MonthItemComponent implements OnInit {
  @Input() monthNumber = 0;
  @Input() highlightCurrentMonth = false;
  @Input() currentMonth = 0;
  @Input() editMode = false;
  @Output() addCalendarItemClick = new EventEmitter<number>();
  @Output() editCalendarItemClick = new EventEmitter<CalendarItem>();
  @Output() deleteCalendarItemClick = new EventEmitter<CalendarItem>();
  itemClass = {};
  highligtMonth = false;
  monthName: string;
  calendarItems$: Observable<CalendarItem[]>;
  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    if (this.highlightCurrentMonth) {
      this.highligtMonth = this.monthNumber === this.currentMonth;
    }

    this.monthName = this.calendarService.getMonthName(this.monthNumber);
    const className = 'month-' + this.monthNumber + '-container';
    this.itemClass[className] = true;
    this.itemClass['month-active'] = this.highligtMonth;

    if (this.editMode) {
      this.calendarItems$ = this.calendarService.getCalendarItems(this.monthNumber);
    } else {
      this.calendarItems$ = this.calendarService.getCalendarItems(this.monthNumber).pipe(take(1));
    }
  }

  addCalendarItem() {
    this.addCalendarItemClick.next(this.monthNumber);
  }

  editCalendarItemClicked(item: CalendarItem) {
    this.editCalendarItemClick.next(item);
  }

  deleteCalendarItemClicked(item: CalendarItem) {
    this.deleteCalendarItemClick.next(item);
  }
}
