import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../components/shared/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

export interface NavbarRoutes {
  prevRoute: string;
  currentRoute: string;
}

export interface NavbarTitleData {
  title: string;
  colorState: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  navbarTitle: Subject<string | NavbarTitleData> = new Subject<string | NavbarTitleData>();
  private navbarRouteChange: Subject<void> = new Subject<void>();
  private navbarRouteBackChange: Subject<void> = new Subject<void>();
  private navbarshowProgress: Subject<boolean> = new Subject<boolean>();
  private navbarshowIndicator: Subject<boolean> = new Subject<boolean>();
  private backRouteClicked = false;
  prevRoute: string = null;
  currentRoute: string = null;
  prevRoutesIndex: string[] = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog) {
    this.currentRoute = this.router.url;
    this.prevRoute = this.currentRoute;

    this.router.events.subscribe((event) => {
      if (this.authService.userId && this.authService.authUserInfo.accepted) {
        if (event instanceof NavigationEnd) {
          const urlTree = this.router.parseUrl(event.url);
          if (urlTree.queryParams.showback !== undefined && urlTree.queryParams.showback === "false") {
            this.resetRouteIndex();
            this.backRouteClicked = false;
            this.emitRouteChange();
            return;
          }

          this.prevRoute = this.currentRoute;
          this.currentRoute = event.url;

          if (this.currentRoute && this.currentRoute === "/") {
            this.resetRouteIndex();
          } else {
            if (!this.backRouteClicked && this.prevRoute) {
              this.prevRoutesIndex.push(this.prevRoute);
            }
          }

          this.backRouteClicked = false;
          this.emitRouteChange();
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

  resetRouteIndex() {
    this.prevRoutesIndex = [];
    this.prevRoute = null;
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

  setNavbarTitleWithColor(data: NavbarTitleData) {
    this.navbarTitle.next(data);
  }

  set showProgressbar(show: boolean) {
    this.navbarshowProgress.next(show);
  }

  get navbarProgress$() {
    return this.navbarshowProgress;
  }

  async logout(): Promise<boolean> {
    const dialogConfirmData: DialogConfirmData = {
      header: "Log ud",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Er du sikker på du vil logge ud?",
      message2: null
    };

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    return new Promise((resolve, reject) => {
      dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
        if (result && result.action === DialogConfirmAction.yes) {
          this.showProgressbar = true;
          await this.authService.logout();
          this.showProgressbar = false;
          resolve(true);
        } else {
          this.showProgressbar = false;
          resolve(false);
        }
      });
    });
  }
}
