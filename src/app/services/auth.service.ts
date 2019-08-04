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
    private splashService: SplashService) {
    this.afAuth.user.pipe(switchMap<firebase.User, Observable<User>>((authUser) => {
      if (authUser) {
        return this.firestoreService.getUser(authUser.uid).pipe(catchError((error) => {
          if (!environment.production) {
            console.error("getUser", error);
          }
          return of(null);
        }));
      } else {
        return of(null);
      }
    })).pipe(catchError((error) => {
      if (!environment.production) {
        console.error("afAuth.user", error);
      }
      return of(null);
    })).subscribe(async (authUser) => {
      this.user = authUser;
      this.id = authUser ? authUser.id : null;
      if (authUser) {
        this.userIsAdmin = authUser.admin;
        this.userIsEditor = authUser.editor;
        await this.getUserMetaData(authUser.id);
        await this.getAppMetaData();
        await this.getUserSettingsData(authUser.id);
        await this.getUsers();
      } else {
        this.userMeta = null;
        this.appMeta = null;
        this.userIsAdmin = false;
        this.userIsEditor = false;
        this.unsubscribe();
      }
      if (!environment.production) {
        console.log("AUTH", authUser);
      }
      this.isAuthenticated.next(authUser ? true : false);
      this.splashService.splashShow.next(false);
    }, (error) => {
      this.user = null;
      this.userIsAdmin = false;
      this.userIsEditor = false;
      this.isAuthenticated.next(false);
      this.id = null;
      this.users = {};
      this.splashService.splashShow.next(false);

      if (!environment.production) {
        console.log("AUTH ERROR", error);
      }
    });
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
    return new Promise((resolve) => {
      this.usersSub = this.firestoreService.getUsers().pipe(catchError((error) => {
        console.error("getUsers", error);
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
    return new Promise((resolve) => {
      this.userMetaSub = this.firestoreService.getUserMeta(userId).pipe(catchError((error) => {
        if (!environment.production) {
          console.error("getUserMetaData", error);
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
    return new Promise((resolve) => {
      this.appMetaSub = this.firestoreService.getAppMeta().pipe(catchError((error) => {
        if (!environment.production) {
          console.error("getAppMetaData", error);
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
    return new Promise((resolve) => {
      this.userSettingsSub = this.firestoreService.getUserSettings(userId).pipe(catchError((error) => {
        if (!environment.production) {
          console.error("getUserSettingsData", error);
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
    this.isAuthenticated.next(false);
    return this.afAuth.auth.signOut();
  }

  sendResetPasswordEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email.trim());
  }
}
