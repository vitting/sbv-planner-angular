import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit {
  @Input() projectUsers: string [] = [];
  constructor() { }

  ngOnInit() {
  }

}
