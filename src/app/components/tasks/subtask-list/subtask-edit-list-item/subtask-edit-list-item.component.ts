import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubTask } from 'src/app/models/subtask.model';

@Component({
  selector: 'app-subtask-edit-list-item',
  templateUrl: './subtask-edit-list-item.component.html',
  styleUrls: ['./subtask-edit-list-item.component.scss']
})
export class SubtaskEditListItemComponent implements OnInit {
  @Input() subTask: SubTask;
  @Output() delete: EventEmitter<SubTask> = new EventEmitter<SubTask>();
  @Output() edit: EventEmitter<SubTask> = new EventEmitter<SubTask>();
  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.delete.emit(this.subTask);
  }

  onEdit() {
    this.edit.emit(this.subTask);
  }
}
