import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';
import { switchMap } from 'rxjs/operators';
import { of, combineLatest, ReplaySubject, Observable, Subscription } from 'rxjs';
import { SplashService } from './splash.service';
import { UserMeta } from '../models/user-meta.model';
import { AppMeta } from '../models/app-meta.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new ReplaySubject<boolean>(1);
  private appMetaUpdated = new ReplaySubject<AppMeta>(1);
  private userMetaUpdated = new ReplaySubject<UserMeta>(1);
  private user: User;
  private id: string = null;
  private userIsAdmin = false;
  private users: { [key: string]: User } = {};
  private userMeta: UserMeta;
  private userMetaSub: Subscription;
  private appMeta: AppMeta;
  private appMetaSub: Subscription;
  constructor(
    private afAuth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private splashService: SplashService) {
    const userAuth$ = this.afAuth.user.pipe(switchMap<firebase.User, Observable<User>>((authUser) => {
      if (authUser) {
        return this.firestoreService.getUser(authUser.uid);
      } else {
        return of(null);
      }
    }));

    const users$ = this.firestoreService.getUsers();
    combineLatest([userAuth$, users$]).subscribe(async ([authUser, users]) => {
      this.user = authUser;
      this.id = authUser ? authUser.id : null;
      if (authUser) {
        this.userIsAdmin = authUser.admin;
        await this.getUserMetaData(authUser.id);
        await this.getAppMetaData();
        users.forEach((user) => {
          this.users[user.id] = user;
        });
      } else {
        this.userMeta = null;
        this.appMeta = null;
        this.userIsAdmin = false;
        if (this.userMetaSub) {
          this.userMetaSub.unsubscribe();
        }

        if (this.appMetaSub) {
          this.userMetaSub.unsubscribe();
        }
      }
      console.log("AUTH", authUser);
      this.isAuthenticated.next(authUser ? true : false);
      this.splashService.splashShow.next(false);
    }, (error) => {
      this.user = null;
      this.isAuthenticated.next(false);
      this.id = null;
      this.users = {};
      console.log("AUTH ERROR", error);
    });
  }

  private getUserMetaData(userId: string) {
    return new Promise((resolve) => {
      this.userMetaSub = this.firestoreService.getUserMeta(userId).subscribe((userMeta: UserMeta) => {
        this.userMeta = userMeta;
        this.userMetaUpdated.next(userMeta);
        resolve(null);
      });
    });
  }

  private getAppMetaData() {
    return new Promise((resolve) => {
      this.appMetaSub = this.firestoreService.getAppMeta().subscribe((appMeta: AppMeta) => {
        this.appMeta = appMeta;
        this.appMetaUpdated.next(appMeta);
        resolve(null);
      });
    });
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
