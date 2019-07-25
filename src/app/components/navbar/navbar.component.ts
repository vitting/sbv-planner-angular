import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService, NavbarTitleData } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarTitle: string;
  navbarColorState = "project"; // project, task, comment, users
  navbarColorStateData = {};
  showNavBack = false;
  showProgressbar = false;
  showIndicator = false;
  showIsAuth = false;
  private navbarTitleSub: Subscription;
  private navbarShowProgressSub: Subscription;
  private navbarRouteChangeSub: Subscription;
  private navbarShowIndicatorSub: Subscription;
  private navbarShowAuthSub: Subscription;
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.navbarTitleSub = this.navbarService.navbarTitle.subscribe((data: string | NavbarTitleData) => {
      if (typeof data === "string") {
        this.navbarTitle = data;
        this.navbarColorStateData = {};
      } else {
        this.navbarTitle = data.title;
        this.navbarColorState = data.colorState;
        this.setColorState();
      }

    });

    this.navbarShowProgressSub = this.navbarService.navbarProgress$.subscribe((show: boolean) => {
      this.showProgressbar = show;
    });

    this.navbarRouteChangeSub = this.navbarService.navbarRouteChange$.subscribe(() => {
      if (this.navbarService.prevRoutesIndex.length) {
        this.showNavBack = true;
      } else {
        this.showNavBack = false;
      }
    });

    this.navbarShowIndicatorSub = this.navbarService.navbarShowIndicator$.subscribe((show) => {
      this.showIndicator = show;
    });

    this.navbarShowAuthSub = this.authService.isUserAuthenticated$.subscribe((auth) => {
      if (auth && this.authService.authUserInfo.accepted) {
        this.showIsAuth = true;
      } else {
        this.showIsAuth = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.navbarTitleSub) {
      this.navbarTitleSub.unsubscribe();
    }

    if (this.navbarShowProgressSub) {
      this.navbarShowProgressSub.unsubscribe();
    }

    if (this.navbarRouteChangeSub) {
      this.navbarRouteChangeSub.unsubscribe();
    }

    if (this.navbarShowIndicatorSub) {
      this.navbarShowIndicatorSub.unsubscribe();
    }

    if (this.navbarShowAuthSub) {
      this.navbarShowAuthSub.unsubscribe();
    }
  }

  private setColorState() {
    this.navbarColorStateData = {
      "app-appbar-color-state-project": this.navbarColorState === "project",
      "app-appbar-color-state-task": this.navbarColorState === "task",
      "app-appbar-color-state-comment": this.navbarColorState === "comment",
      "app-appbar-color-state-user": this.navbarColorState === "user",
      "app-appbar-color-state-template": this.navbarColorState === "user",
    };
  }

  backButtonClick() {
    this.navbarService.emitRouteBackChange();
  }

  async logout() {
    const result = await this.navbarService.logout();
    if (result) {
      this.router.navigate(["/login"]);
    }
  }

  menuItemClick(action: string) {
    switch (action) {
      case "home":

        break;
      case "help":

        break;
      case "logout":
        this.logout();
        break;
      case "approveusers":

        break;
      default:
        break;
    }
  }
}
