import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-chip',
  templateUrl: './user-chip.component.html',
  styleUrls: ['./user-chip.component.scss']
})
export class UserChipComponent implements OnInit {
  @Input() name = "";
  @Input() selected = false;
  @Input() type = "project";
  @Input() completed = false;
  @Input() enableRemoveButton = true;
  config = {};
  constructor() { }

  ngOnInit() {
    this.config = {
      'user-chip-project': this.type === 'project',
      'user-chip-task': this.type === 'task',
      'user-chip-subtask': this.type === 'subtask',
      'user-chip-me': this.selected,
      'user-chip-subtask-completed': this.completed
    };
  }
}
