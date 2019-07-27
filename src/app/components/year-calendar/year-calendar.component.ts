import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.scss']
})
export class YearCalendarComponent implements OnInit {
  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  currentMonth = 0;
  constructor() { }

  ngOnInit() {
    this.currentMonth = new Date(Date.now()).getMonth();
  }

}
