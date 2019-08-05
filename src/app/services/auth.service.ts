import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of, ReplaySubject, Observable, Subscription } from 'rxjs';
import { SplashService } from './splash.service';
import { UserMeta } from '../models/user-meta.model';
import { AppMeta } from '../models/app-meta.model';
import { Settings } from '../models/settings.model';
import { environment } from 'src/environments/environment';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction } from '../components/shared/dialog-confirm/dialog-confirm.component';
import { FabButtonService } from './fab-button.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new ReplaySubject<boolean>(1);
  private appMetaUpdated = new ReplaySubject<AppMeta>(1);
  private userMetaUpdated = new ReplaySubject<UserMeta>(1);
  private userSettingsUpdated = new ReplaySubject<Settings>(1);
  private user: User;
  private id: string = null;
  private userIsAdmin = false;
  private userIsEditor = false;
  private users: { [key: string]: User } = {};
  private userSettings: Settings;
  private userMeta: UserMeta;
  private userMetaSub: Subscription;
  private appMeta: AppMeta;
  private usersSub: Subscription;
  private appMetaSub: Subscription;
  private userSettingsSub: Subscription;
  constructor(
    private afAuth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private fabbuttonService: FabButtonService,
    private splashService: SplashService,
    private router: Router,
    private dialog: MatDialog) {
    this.afAuth.user.pipe(switchMap<firebase.User, Observable<User>>((authUser) => {
      if (environment.debug) {
        console.log("Authenticated user", authUser);
      }
      if (authUser) {
        return this.firestoreService.getUser(authUser.uid).pipe(catchError((error) => {
          if (environment.debug) {
            console.error("getUser", error);
          } else {
            this.firestoreService.addToLog(error, this.id, "error", "AuthService");
          }
          return of(null);
        }));
      } else {
        return of(null);
      }
    })).pipe<User>(catchError((error) => {
      if (environment.debug) {
        console.error("afAuth.user", error);
      } else {
        this.firestoreService.addToLog(error, this.id, "error", "AuthService");
      }

      return of(null);
    })).subscribe(async (user) => {
      if (environment.debug) {
        console.log("CURRENT USER", this.user);
        console.log("NEW USER", user);
      }

      if (this.user && user) {
        if (this.user.active && !user.active) {
          this.userDeactivated();
        }
      }

      if (user) {
        this.setUserValues(user);
      } else {
        this.resetUserValues();
      }
      if (environment.debug) {
        console.log("AUTH", user);
      }

      this.splashService.splashShow.next(false);
    }, (error) => {
      this.resetUserValues();

      if (environment.debug) {
        console.log("AUTH ERROR", error);
      } else {
        this.firestoreService.addToLog(error, this.id, "error", "AuthService");
      }

    });
  }

  private userDeactivated() {
    const dialogConfirmData: DialogConfirmData = {
      header: "Konto deaktiveret",
      button1Text: null,
      button2Text: null,
      buttonOkText: "Ok",
      message1: "Din konto er blevet deaktiveret.",
      message2: "Du vil blive logget ud."
    };

    this.fabbuttonService.showFabButton = false;
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      disableClose: true,
      data: dialogConfirmData
    });

    dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      this.fabbuttonService.showFabButton = true;
      if (result && result.action === DialogConfirmAction.ok) {
        await this.logout();
        this.router.navigate(["/login"]);
      }
    });
  }

  private async setUserValues(user: User) {
    this.id = user.id;
    this.user = user;
    this.userIsAdmin = user.admin;
    this.userIsEditor = user.editor;
    await this.getUserMetaData(user.id);
    await this.getAppMetaData();
    await this.getUserSettingsData(user.id);
    await this.getUsers();
    this.isAuthenticated.next(true);
  }

  private resetUserValues() {
    this.id = null;
    this.user = null;
    this.userMeta = null;
    this.appMeta = null;
    this.userIsAdmin = false;
    this.userIsEditor = false;
    this.users = {};
    this.unsubscribe();
    this.isAuthenticated.next(false);
  }

  private unsubscribe() {
    if (this.userMetaSub) {
      this.userMetaSub.unsubscribe();
    }

    if (this.appMetaSub) {
      this.userMetaSub.unsubscribe();
    }

    if (this.userSettingsSub) {
      this.userSettingsSub.unsubscribe();
    }

    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

  private getUsers() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
    return new Promise((resolve) => {
      this.usersSub = this.firestoreService.getUsers().pipe(catchError((error) => {
        if (environment.debug) {
          console.error("getUsers", error);
        } else {
          this.firestoreService.addToLog(error, this.id, "error", "AuthService");
        }

        return of([]);
      })).subscribe((users: User[]) => {
        for (const user of users) {
          this.users[user.id] = user;
        }
        resolve(null);
      });
    });
  }

  private getUserMetaData(userId: string) {
    if (this.userMetaSub) {
      this.userMetaSub.unsubscribe();
    }
    return new Promise((resolve) => {
      this.userMetaSub = this.firestoreService.getUserMeta(userId).pipe(catchError((error) => {
        if (environment.debug) {
          console.error("getUserMetaData", error);
        } else {
          this.firestoreService.addToLog(error, this.id, "error", "AuthService");
        }

        return of(null);
      })).subscribe((userMeta: UserMeta) => {
        this.userMeta = userMeta;
        this.userMetaUpdated.next(userMeta);
        resolve(null);
      });
    });
  }

  private getAppMetaData() {
    if (this.appMetaSub) {
      this.userMetaSub.unsubscribe();
    }
    return new Promise((resolve) => {
      this.appMetaSub = this.firestoreService.getAppMeta().pipe(catchError((error) => {
        if (environment.debug) {
          console.error("getAppMetaData", error);
        } else {
          this.firestoreService.addToLog(error, this.id, "error", "AuthService");
        }

        return of(null);
      })).subscribe((appMeta: AppMeta) => {
        this.appMeta = appMeta;
        this.appMetaUpdated.next(appMeta);
        resolve(null);
      });
    });
  }

  private getUserSettingsData(userId: string) {
    if (this.userSettingsSub) {
      this.userSettingsSub.unsubscribe();
    }
    return new Promise((resolve) => {
      this.userSettingsSub = this.firestoreService.getUserSettings(userId).pipe(catchError((error) => {
        if (environment.debug) {
          console.error("getUserSettingsData", error);
        } else {
          this.firestoreService.addToLog(error, this.id, "error", "AuthService");
        }

        return of(null);
      })).subscribe((settings: Settings) => {
        this.userSettings = settings;
        this.userSettingsUpdated.next(settings);
        resolve(null);
      });
    });
  }

  get userSettingsWhenUpdated$() {
    return this.userSettingsUpdated;
  }

  get authUserSettings() {
    return this.userSettings;
  }

  get appMetaWhenUpdated$() {
    return this.appMetaUpdated;
  }

  get authAppMeta() {
    return this.appMeta;
  }

  get userMetaWhenUpdated$() {
    return this.userMetaUpdated;
  }

  get authUserMeta() {
    return this.userMeta;
  }

  get isUserAuthenticated$() {
    return this.isAuthenticated;
  }

  get authUserInfo() {
    return this.user;
  }

  get userId() {
    return this.id;
  }

  get isAdmin() {
    return this.userIsAdmin;
  }

  get isEditor() {
    return this.userIsEditor;
  }

  getUserInfo(userId: string) {
    return this.users[userId];
  }

  createUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  sendResetPasswordEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email.trim());
  }
}
