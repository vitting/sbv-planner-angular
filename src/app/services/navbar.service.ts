import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  navbarTitle: Subject<string> = new Subject<string>();
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

  setNavbarTitle(title: string) {
    this.navbarTitle.next(title);
  }
}
