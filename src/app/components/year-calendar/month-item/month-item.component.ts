import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarItem } from 'src/app/models/calendar.model';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-month-item',
  templateUrl: './month-item.component.html',
  styleUrls: ['./month-item.component.scss']
})
export class MonthItemComponent implements OnInit, OnDestroy {
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
  calendarItems: CalendarItem[] = [];
  calendarItemsSub: Subscription;
  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    if (this.highlightCurrentMonth) {
      this.highligtMonth = this.monthNumber === this.currentMonth;
    }

    this.monthName = this.calendarService.getMonthName(this.monthNumber);
    const className = 'month-' + this.monthNumber + '-container';
    this.itemClass[className] = true;
    this.itemClass['month-active'] = this.highligtMonth;
    this.itemClass['month-edit'] = this.editMode;

    if (this.editMode) {
      this.calendarItemsSub = this.calendarService.getCalendarItems(this.monthNumber).subscribe((calenderItems) => {
        this.calendarItems = calenderItems;
      });
    } else {
      this.calendarService.getCalendarItems(this.monthNumber).pipe(take(1)).subscribe((calenderItems) => {
        this.calendarItems = calenderItems;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.calendarItemsSub) {
      this.calendarItemsSub.unsubscribe();
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
