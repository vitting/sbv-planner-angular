import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = "Mine projekter";
  showLogout = true;
  constructor(private navbarService: NavbarService, private authService: AuthService) { }

  ngOnInit() {
    this.navbarService.navbarTitle.subscribe((title: string) => {
      this.title = title;
    });

    this.navbarService.showLogoutButton.subscribe((showLogout) => {
      this.showLogout = showLogout;
    });
  }

  async logout() {
    await this.authService.logout();
    this.showLogout = false;
  }
}
