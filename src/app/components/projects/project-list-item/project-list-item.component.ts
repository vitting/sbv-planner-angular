import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

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
  users: User[] = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.project.users) {
      this.project.users.forEach((userId) => {
        const user = this.authService.getUserInfo(userId);
        this.users.push(user);
      });
    }
  }

  showMenu() {
    this.menuClick.next(this.project);
  }
}
