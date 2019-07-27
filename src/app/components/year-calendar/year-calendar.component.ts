import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.scss']
})
export class YearCalendarComponent implements OnInit {
  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  currentMonth = 0;
  editMode = false;
  highlightCurrentMonth = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentMonth = new Date(Date.now()).getMonth();

    if (this.route.snapshot.toString().toLocaleLowerCase().indexOf("edit") !== -1) {
      this.editMode = true;
    } else {
      this.highlightCurrentMonth = true;
    }

  }

}
