import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {
  @Input() showDetails = true;
  @Input() showDetailsEdit = false;
  @Input() showUsers = true;
  @Input() project: Project;
  @Output() menuClick = new EventEmitter<Project>();
  users: string[] = ["Christian Nicolaisen", "Louise Dam", "Tanja Jensen", "Peter Larsen", "Jeppe Kjems", "Thomas Hoeg"];
  constructor() { }

  ngOnInit() {

  }

  showMenu() {
    this.menuClick.next(this.project);
  }
}
