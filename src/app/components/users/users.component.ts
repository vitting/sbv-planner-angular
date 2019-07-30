import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  mode = "";
  constructor(private navbarService: NavbarService, private route: ActivatedRoute) { }

  ngOnInit() {
    const action = this.route.snapshot.params.action;
    if (action && action === "accept") {
      this.navbarService.setNavbarTitleWithColor({
        title: "Godkend brugere",
        colorState: "user"
      });
      this.mode = "accept";
    }

    if (action && action === "admin") {
      this.navbarService.setNavbarTitleWithColor({
        title: "Administrere brugere",
        colorState: "user"
      });
      this.mode = "admin";
    }
  }
}
