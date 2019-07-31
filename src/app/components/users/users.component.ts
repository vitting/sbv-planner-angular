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
  private action: string;
  constructor(private navbarService: NavbarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.action = this.route.snapshot.params.action;
    this.initialize();
    this.route.params.subscribe((params) => {
      if (params.action) {
        this.action = params.action;
        this.initialize();
      }
    });
  }

  private initialize() {
    if (this.action && this.action === "accept") {
      this.navbarService.setNavbarTitleWithColor({
        title: "Godkend brugere",
        colorState: "user"
      });
      this.mode = "accept";
    }

    if (this.action && this.action === "admin") {
      this.navbarService.setNavbarTitleWithColor({
        title: "Administrere brugere",
        colorState: "user"
      });
      this.mode = "admin";
    }
  }
}
