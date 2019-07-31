import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService, NavbarTitleData } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

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
  showLogout = false;
  private navbarTitleSub: Subscription;
  private navbarShowProgressSub: Subscription;
  private navbarRouteChangeSub: Subscription;
  private navbarShowIndicatorSub: Subscription;
  private navbarShowAuthSub: Subscription;
  private appMetaSub: Subscription;
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

    // Show/hide progressBar
    this.navbarShowProgressSub = this.navbarService.navbarProgress$.subscribe((show: boolean) => {
      this.showProgressbar = show;
    });

    // Show/hide back button
    this.navbarRouteChangeSub = this.navbarService.navbarRouteChange$.subscribe(() => {
      if (this.navbarService.prevRoutesIndex.length) {
        this.showNavBack = true;
      } else {
        this.showNavBack = false;
      }
    });

    // Show/hide a red indicator on Menu icon
    this.navbarShowIndicatorSub = this.navbarService.navbarShowIndicator$.subscribe((show) => {
      this.showIndicator = show;
    });

    // Indicate if user is accepted by the administrator
    this.navbarShowAuthSub = this.authService.isUserAuthenticated$.subscribe((auth) => {
      if (auth && this.authService.authUserInfo.accepted) {
        this.showIsAuth = true;
        this.showLogout = false;
      } else if (auth && this.authService.authUserInfo.waitingForApproval) {
        this.showLogout = true;
      } else {
        this.showIsAuth = false;
        this.showLogout = false;
      }
    });

    this.appMetaSub = this.authService.appMetaWhenUpdated$.subscribe((appMeta) => {
      if (this.authService.isAdmin) {
        if (appMeta && appMeta.usersToApprove) {
          const metaAcceptVisit = this.authService.authUserMeta["accept-visit"];
          if (metaAcceptVisit && metaAcceptVisit.usersApprovedLastChecked) {
            const appDate: Date = appMeta.userToApproveLastUpdated.toDate();
            const userDate: Date = metaAcceptVisit.usersApprovedLastChecked.toDate();
            if (userDate.getTime() < appDate.getTime()) {
              this.navbarService.showIndicator = true;
            } else {
              this.navbarService.showIndicator = false;
            }
          } else {
            this.navbarService.showIndicator = false;
          }
        } else {
          this.navbarService.showIndicator = false;
        }
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

    if (this.appMetaSub) {
      this.appMetaSub.unsubscribe();
    }
  }

  private setColorState() {
    this.navbarColorStateData = {
      "app-appbar-color-state-project": this.navbarColorState === "project",
      "app-appbar-color-state-task": this.navbarColorState === "task",
      "app-appbar-color-state-comment": this.navbarColorState === "comment",
      "app-appbar-color-state-user": this.navbarColorState === "user",
      "app-appbar-color-state-template": this.navbarColorState === "template",
      "app-appbar-color-state-message": this.navbarColorState === "message",
      "app-appbar-color-state-setting": this.navbarColorState === "setting"
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
        this.router.navigate(["/"]);
        break;
      case "calendar":
        this.router.navigate(["/calendar"]);
        break;
      case "calendaredit":
        this.router.navigate(["/calendar/edit"]);
        break;
      case "projects":
        this.router.navigate(["/projects"]);
        break;
      case "templates":
        this.router.navigate(["/templates"]);
        break;
      case "approveusers":
        this.router.navigate(["/users/accept"]);
        break;
      case "adminusers":
        this.router.navigate(["/users/admin"]);
        break;
      case "help":

        break;
      case "settings":
        this.router.navigate(["/settings"]);
        break;
      case "logout":
        this.logout();
        break;
      default:
        break;
    }
  }
}
