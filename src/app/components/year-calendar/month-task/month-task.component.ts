import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarItem } from 'src/app/models/calendar.model';

@Component({
  selector: 'app-month-task',
  templateUrl: './month-task.component.html',
  styleUrls: ['./month-task.component.scss']
})
export class MonthTaskComponent implements OnInit {
  @Input() calendarItem: CalendarItem;
  @Input() editMode = false;
  @Output() editCalendarItemClick = new EventEmitter<CalendarItem>();
  @Output() deleteCalendarItemClick = new EventEmitter<CalendarItem>();
  constructor() { }

  ngOnInit() {
  }

  editCalendarItem() {
    this.editCalendarItemClick.next(this.calendarItem);
  }

  deleteCalendarItem() {
    this.deleteCalendarItemClick.next(this.calendarItem);
  }
}
