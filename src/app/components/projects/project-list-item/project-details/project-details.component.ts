import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Summary } from 'src/app/models/summary.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectDate: Date;
  @Input() summary: Summary;
  @Output() commentsTotalClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() tasksClick: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  commentClicked() {
    this.commentsTotalClick.emit();
  }

  tasksClicked() {
    this.tasksClick.emit();
  }
}
