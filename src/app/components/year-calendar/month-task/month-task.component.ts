import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-month-task',
  templateUrl: './month-task.component.html',
  styleUrls: ['./month-task.component.scss']
})
export class MonthTaskComponent implements OnInit {
  @Input() title: string;
  @Input() editMode = false;
  constructor() { }

  ngOnInit() {
  }

  editTask() {

  }

  deleteTask() {

  }
}
