import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-title-desc',
  templateUrl: './item-title-desc.component.html',
  styleUrls: ['./item-title-desc.component.scss']
})
export class ItemTitleDescComponent implements OnInit {
  @Input() title = "";
  @Input() description = null;
  @Input() completed = false;
  constructor() { }

  ngOnInit() {
  }

}
