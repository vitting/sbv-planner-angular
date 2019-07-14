import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-chip',
  templateUrl: './user-chip.component.html',
  styleUrls: ['./user-chip.component.scss']
})
export class UserChipComponent implements OnInit {
  @Input() name = "";
  @Input() selected = false;
  constructor() { }

  ngOnInit() {
  }

}
