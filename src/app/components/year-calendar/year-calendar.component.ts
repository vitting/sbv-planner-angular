import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarItem } from 'src/app/models/calendar.model';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html'
})
export class YearCalendarComponent implements OnInit {
  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  currentMonth = 0;
  editMode = false;
  highlightCurrentMonth = false;
  constructor(private calendarService: CalendarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentMonth = new Date(Date.now()).getMonth();

    if (this.route.snapshot.params.action && this.route.snapshot.params.action === "edit") {
      this.editMode = true;
    } else {
      this.highlightCurrentMonth = true;
    }
  }

  async addCalendarItemClick(month: number) {
    const itemId = await this.calendarService.addCalendarItem(month);
  }

  async editCalendarItemClick(item: CalendarItem) {
    const itemId = await this.calendarService.editCalendarItem(item);
  }

  async deleteCalendarItemClick(item: CalendarItem) {
    const itemId = await this.calendarService.deleteItem(item);
  }
}
