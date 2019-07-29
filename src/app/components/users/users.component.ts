import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Route, ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  mode = "";
  private usersSub: Subscription;
  constructor(private navbarService: NavbarService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    const action = this.route.snapshot.params.action;
    if (action && action === "accept") {
      this.navbarService.setNavbarTitleWithColor({
        title: "Godkend brugere",
        colorState: "user"
      });
      this.mode = "accept";
      this.usersSub = this.userService.getUsersWaitingForApproval().subscribe((users) => {
        this.users = users;
      });

      this.userService.updateUserMetaLastCheckToAcceptUsers();
    }
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }
}
