import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent implements OnInit {
  @Output() add = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    this.add.emit();
  }
}
