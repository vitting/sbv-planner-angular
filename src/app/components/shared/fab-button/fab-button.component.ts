import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent implements OnInit {
  @Output() fabClick = new EventEmitter<void>();
  @Input() iconType = "add";
  constructor() { }

  ngOnInit() {
  }

  onFabClick() {
    this.fabClick.emit();
  }
}
