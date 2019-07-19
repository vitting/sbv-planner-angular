import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

export interface NavbarTitleConfig {
  title: string;
  icon: {
    collection: string;
    icon: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  navbarTitle: Subject<NavbarTitleConfig> = new Subject<NavbarTitleConfig>();
  showLogoutButton: Subject<boolean> = new Subject<boolean>();
  private prevRoute: string;
  private currentRoute: string;
  constructor(private router: Router) {
    this.currentRoute = this.router.url;
    console.log("PREV URL", this.prevRoute);
    console.log("CURRENT URL", this.currentRoute);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.prevRoute = this.currentRoute;
        this.currentRoute = event.url;
        console.log("PREV URL", this.prevRoute);
        console.log("CURRENT URL", this.currentRoute);
      }
    });
  }

  get previousUrl() {
    return this.prevRoute;
  }

  get currentUrl() {
    return this.currentRoute;
  }

  setNavbarTitle(navbarTitleConfig: NavbarTitleConfig) {
    this.navbarTitle.next(navbarTitleConfig);
  }
}
