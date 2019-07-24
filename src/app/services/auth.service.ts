import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';
import { switchMap } from 'rxjs/operators';
import { of, combineLatest, ReplaySubject, Observable } from 'rxjs';
import { SplashService } from './splash.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private user: User;
  private id: string = null;
  private userIsAdmin = false;
  private users: { [key: string]: User } = {};
  constructor(private afAuth: AngularFireAuth, private firestoreService: FirestoreService, private splashService: SplashService) {
    const userAuth$ = this.afAuth.user.pipe(switchMap<firebase.User, Observable<User>>((authUser) => {
      if (authUser) {
        return this.firestoreService.getUser(authUser.uid);
      } else {
        return of(null);
      }
    }));

    const users$ = this.firestoreService.getUsers();

    combineLatest([userAuth$, users$]).subscribe(([authUser, users]) => {
      this.user = authUser;
      this.id = authUser ? authUser.id : null;
      if (authUser) {
        this.userIsAdmin = authUser.admin;
        users.forEach((user) => {
          this.users[user.id] = user;
        });
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
}
