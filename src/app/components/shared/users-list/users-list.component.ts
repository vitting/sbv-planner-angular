import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() type = "project";
  @Input() completedUserId: string = null;
  @Output() userClick: EventEmitter<User> = new EventEmitter<User>();
  authUserId = "";
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authUserId = this.authService.userId;
  }

  userClicked(user: User) {
    if (user.id === this.authUserId) {
      this.userClick.next(user);
    }
  }
}
