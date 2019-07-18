import { Component, OnInit, Output, EventEmitter, Input, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-fab-menu-button',
  templateUrl: './fab-menu-button.component.html',
  styleUrls: ['./fab-menu-button.component.scss'],
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
export class FabMenuButtonComponent implements OnInit, AfterViewInit {
  @Output() fabClick = new EventEmitter<void>();
  @Input() iconType = "add";
  state = "right";
  constructor(private elemRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }


  onFabClick() {
    // this.fabClick.emit();
    console.log(this.elemRef.nativeElement.getBoundingClientRect());
  }

  moveButton() {
    if (this.state === "left") {
      this.state = "right";
    } else {
      this.state = "left";
    }
  }
}
