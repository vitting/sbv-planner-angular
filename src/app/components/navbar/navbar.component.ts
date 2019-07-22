import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
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
  navbarTitle: string;
  showNavBack = false;
  showProgressbar = false;
  showIndicator = false;
  private navbarTitleSub: Subscription;
  private navbarShowProgressSub: Subscription;
  private navbarRouteChangeSub: Subscription;
  private navbarShowIndicatorSub: Subscription;
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.navbarTitleSub = this.navbarService.navbarTitle.subscribe((title: string) => {
      this.navbarTitle = title;
    });

    this.navbarShowProgressSub = this.navbarService.navbarProgress$.subscribe((show: boolean) => {
      this.showProgressbar = show;
    });

    this.navbarRouteChangeSub = this.navbarService.navbarRouteChange$.subscribe(() => {
      if (this.navbarService.prevRoutesIndex.length) {
        console.log(this.navbarService.prevRoutesIndex);
        this.showNavBack = true;
      } else {
        this.showNavBack = false;
      }
    });

    this.navbarShowIndicatorSub = this.navbarService.navbarShowIndicator$.subscribe((show) => {
      this.showIndicator = show;
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
  }

  backButtonClick() {
    this.navbarService.emitRouteBackChange();
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
      case "approveusers":

        break;
      default:
        break;
    }
  }
}
