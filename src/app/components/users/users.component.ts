import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private usersSub: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.usersSub = this.userService.getUsersWaitingForApproval().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }
}
