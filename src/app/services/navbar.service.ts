import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';

export interface NavbarRoutes {
  prevRoute: string;
  currentRoute: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  navbarTitle: Subject<string> = new Subject<string>();
  private navbarRouteChange: Subject<void> = new Subject<void>();
  private navbarRouteBackChange: Subject<void> = new Subject<void>();
  private navbarshowProgress: Subject<boolean> = new Subject<boolean>();
  private navbarshowIndicator: Subject<boolean> = new Subject<boolean>();
  private backRouteClicked = false;
  prevRoute: string = null;
  currentRoute: string = null;
  prevRoutesIndex: string[] = [];
  constructor(private router: Router, private authService: AuthService) {
    this.currentRoute = this.router.url;
    this.prevRoute = this.currentRoute;

    this.router.events.subscribe((event) => {
      if (this.authService.userId && this.authService.authUserInfo.accepted) {
        if (event instanceof NavigationEnd) {

          this.prevRoute = this.currentRoute;
          this.currentRoute = event.url;

          if (this.currentRoute && this.currentRoute === "/") {
            this.prevRoutesIndex = [];
            this.prevRoute = null;
          } else {
            if (!this.backRouteClicked && this.prevRoute) {
              this.prevRoutesIndex.push(this.prevRoute);
            }
          }

          this.emitRouteChange();
          this.backRouteClicked = false;
        }
      }
    });

    this.navbarRouteBackChange.subscribe(async () => {
      this.backRouteClicked = true;
      const route = this.prevRoutesIndex.pop();
      await this.router.navigate([route]);
    });
  }

  private emitRouteChange() {
    this.navbarRouteChange.next();
  }

  emitRouteBackChange() {
    this.navbarRouteBackChange.next();
  }

  set showIndicator(status: boolean) {
    this.navbarshowIndicator.next(status);
  }

  get navbarShowIndicator$() {
    return this.navbarshowIndicator;
  }

  get navbarRouteChange$() {
    return this.navbarRouteChange;
  }

  get previousUrl() {
    return this.prevRoute;
  }

  get currentUrl() {
    return this.currentRoute;
  }

  setNavbarTitle(title: string) {
    this.navbarTitle.next(title);
  }

  set showProgressbar(show: boolean) {
    this.navbarshowProgress.next(show);
  }

  get navbarProgress$() {
    return this.navbarshowProgress;
  }
}
