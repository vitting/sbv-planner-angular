import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService, NavbarTitleConfig } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  title = "Mine projekter";
  navbarTitleData: NavbarTitleConfig;
  showLogout = true;
  private navbarTitleSub: Subscription;
  private navbarShowLogoutButtonSub: Subscription;
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.navbarTitleSub = this.navbarService.navbarTitle.subscribe((navbarTitleConfig: NavbarTitleConfig) => {
      this.navbarTitleData = navbarTitleConfig;
    });

    this.navbarShowLogoutButtonSub = this.navbarService.showLogoutButton.subscribe((showLogout) => {
      this.showLogout = showLogout;
    });
  }

  ngOnDestroy(): void {
    if (this.navbarTitleSub) {
      this.navbarTitleSub.unsubscribe();
    }

    if (this.navbarShowLogoutButtonSub) {
      this.navbarShowLogoutButtonSub.unsubscribe();
    }
  }

  async logout() {
    await this.authService.logout();
    this.showLogout = false;
  }
}
