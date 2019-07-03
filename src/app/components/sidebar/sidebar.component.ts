import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger("sidebarState", [
      state("open", style({
        backgroundColor: "red",
        left: "0"
      })),
      state("close", style({
        backgroundColor: "blue",
        left: '-1500px'
      })),
      transition("open <=> close", animate(400))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @Output() openSidebar = new EventEmitter<string>();
  @Input() sidebarState = "open";

  constructor() { }

  ngOnInit() {
  }

  onChange(value: string) {
    this.sidebarState = value;
    this.openSidebar.emit(value);
  }
}
