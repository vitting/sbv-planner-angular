import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

export interface NoDataBoxData {
  textline1: string;
  textline2: string;
}

@Component({
  selector: 'app-no-data-box',
  templateUrl: './no-data-box.component.html',
  styleUrls: ['./no-data-box.component.scss']
})
export class NoDataBoxComponent implements OnInit {
  @ViewChild("itemContainer", {static: true}) element: ElementRef;
  @Input() data: NoDataBoxData;
  @Input() small = false;
  @Input() showButton = false;
  @Output() noDataAddClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  NoDataAddButton() {
    this.noDataAddClick.emit();
  }
}
