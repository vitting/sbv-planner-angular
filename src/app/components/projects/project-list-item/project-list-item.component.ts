import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {
  users: string[] = ["Christian Nicolaisen", "Louise Dam", "Tanja Jensen", "Peter Larsen", "Jeppe Kjems", "Thomas Hoeg"];
  constructor() { }

  ngOnInit() {
  }

}
