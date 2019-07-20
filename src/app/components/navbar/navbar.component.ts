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
  showNavBack = false;
  showProgressbar = false;
  private navbarTitleSub: Subscription;
  private navbarShowProgressSub: Subscription;
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.navbarTitleSub = this.navbarService.navbarTitle.subscribe((navbarTitleConfig: NavbarTitleConfig) => {
      this.navbarTitleData = navbarTitleConfig;
    });

    this.navbarShowProgressSub = this.navbarService.navbarProgress$.subscribe((show: boolean) => {
      this.showProgressbar = show;
    });
  }

  ngOnDestroy(): void {
    if (this.navbarTitleSub) {
      this.navbarTitleSub.unsubscribe();
    }

    if (this.navbarShowProgressSub) {
      this.navbarShowProgressSub.unsubscribe();
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(["/login"]);
  }

  menuItemClick(action: string) {
    switch (action) {
      case "home":

        break;
      case "help":

        break;
      case "logout":

        break;
      default:
        break;
    }
  }
}
