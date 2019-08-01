import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-admin-list',
  templateUrl: './user-admin-list.component.html'
})
export class UserAdminListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private usersSub: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.usersSub = this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }
}
