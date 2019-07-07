import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubTaskItem, SubTask } from 'src/app/models/subtask.model';

@Component({
  selector: 'app-subtask-list-item',
  templateUrl: './subtask-list-item.component.html',
  styleUrls: ['./subtask-list-item.component.scss']
})
export class SubtaskListItemComponent implements OnInit {
  @Input() subTask: SubTask;
  @Output() delete: EventEmitter<SubTask> = new EventEmitter<SubTask>();
  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.delete.next(this.subTask);
  }
}
