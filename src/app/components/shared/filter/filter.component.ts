import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
      opacity: 0
    })),
    state("opened", style({
      height: 100,
      transform: 'scaleY(1)',
      opacity: 1
    })),
    transition("closed => opened", animate("300ms ease-in")),
    transition("opened => closed", animate("300ms ease-out"))
  ])]
})

export class FilterComponent implements OnInit {
  filter1 = true;
  filter2 = false;
  stateOpenClose = "closed";
  private currentfilter = 1;
  constructor() { }

  ngOnInit() {
  }


  filterChange(result: number) {
    console.log(result);
    if (result === 1) {
      this.filter1 = true;
      this.filter2 = false;
    } else {
      this.filter1 = false;
      this.filter2 = true;
    }

    this.currentfilter = result;
  }

  openClose() {
    this.stateOpenClose = this.stateOpenClose === "closed" ? "opened" : "closed";
  }
}
