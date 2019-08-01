import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements OnInit {
  @Input() selected = false;
  @Output() checkboxClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  checkboxClicked() {
    this.selected = !this.selected;
    this.checkboxClick.emit(this.selected);
  }
}
