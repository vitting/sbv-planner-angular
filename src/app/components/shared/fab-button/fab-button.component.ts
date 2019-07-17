import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
  animations: [
    trigger("buttonMove", [
      state("right", style({
        right: '25px'
      })),
      state("left", style({
        left: '25px'
      })),
      transition("right <=> left", animate(200))
    ])
  ]
})
export class FabButtonComponent implements OnInit {
  @Output() fabClick = new EventEmitter<void>();
  @Input() iconType = "add";
  state = "right";
  constructor() { }

  ngOnInit() {
  }

  onFabClick() {
    this.fabClick.emit();
  }

  moveButton() {
    if (this.state === "left") {
      this.state = "right";
    } else {
      this.state = "left";
    }
  }
}
