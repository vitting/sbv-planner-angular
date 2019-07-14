import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  navbarTitle: Subject<string> = new Subject<string>();
  showLogoutButton: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  setNavbarTitle(title: string) {
    this.navbarTitle.next(title);
  }
}
