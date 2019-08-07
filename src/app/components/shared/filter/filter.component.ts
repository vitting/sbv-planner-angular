import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface FilterItem {
  value: number;
  text: string;
  selected: boolean;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [trigger("buttonRotate", [
    state("closed", style({
      transform: 'rotate(0)'
    })),
    state("opened", style({
      transform: 'rotate(180deg)'
    })),
    transition("closed <=> opened", animate("200ms"))
  ]), trigger("containerScale", [
    state("closed", style({
      height: 0,
      transform: 'scaleY(0)',
      opacity: 0,
      'padding-bottom': 0
    })),
    state("opened", style({
      height: 100,
      transform: 'scaleY(1)',
      opacity: 1,
      'padding-bottom': '10px'
    })),
    transition("closed => opened", animate("300ms ease-in")),
    transition("opened => closed", animate("300ms ease-out"))
  ])]
})

export class FilterComponent implements OnInit {
  @Input() title = "";
  @Input() filterItems: FilterItem[] = [];
  @Input() opened = false;
  @Input() containerType = "project"; // project | task | subtask | comment
  @Output() selectionChange = new EventEmitter<number>();
  filter1 = true;
  filter2 = false;
  stateOpenClose = "closed";
  private currentfilter = -1;
  constructor() { }

  ngOnInit() {
    this.filterItems.forEach((item) => {
      if (item.selected) {
        this.currentfilter = item.value;
      }
    });

    this.stateOpenClose = this.opened ? "opened" : "closed";
  }


  filterChange(result: number) {
    this.filterItems.forEach((item) => {
      if (result === item.value) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });

    if (result !== this.currentfilter) {
      this.selectionChange.emit(result);
    }

    this.currentfilter = result;
  }

  openClose() {
    this.stateOpenClose = this.stateOpenClose === "closed" ? "opened" : "closed";
  }
}
