import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Summary } from 'src/app/models/summary.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnChanges {
  @Input() projectDate: Date;
  @Input() summary: Summary;
  @Input() editMode = false;
  @Input() passiveMode = false;
  @Output() commentsTotalClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() tasksClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() editTasksClick: EventEmitter<void> = new EventEmitter<void>();
  passiveFields = false;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.editMode || this.passiveMode) {
      this.passiveFields = true;
    } else {
      this.passiveFields = false;
    }
  }

  commentClicked() {
    this.commentsTotalClick.emit();
  }

  tasksClicked() {
    this.tasksClick.emit();
  }

  editTasksClicked() {
    this.editTasksClick.emit();
  }
}
