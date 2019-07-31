import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messages-error',
  templateUrl: './messages-error.component.html',
  styleUrls: ['./messages-error.component.scss']
})
export class MessagesErrorComponent implements OnInit {
  @Input() messages: string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
