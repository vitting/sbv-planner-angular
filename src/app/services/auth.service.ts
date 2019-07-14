import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';
import { map, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of, forkJoin, combineLatest, Subject } from 'rxjs';
import { SplashService } from './splash.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: Subject<boolean> = new Subject<boolean>();
  private user: User;
  private id: string;
  private users: { [key: string]: User } = {};
  constructor(private afAuth: AngularFireAuth, private firestoreService: FirestoreService, private splashService: SplashService) {
    const userAuth$ = this.afAuth.user.pipe(switchMap((authUser) => {
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
      console.log("AUTHSERVICE", authUser);
      this.isAuthenticated.next(authUser ? true : false);
      if (authUser) {
        users.forEach((user) => {
          this.users[user.id] = user;
        });
      }

      console.log(users);

      this.splashService.splashShow.next(false);
    }, (error) => {
      this.user = null;
      this.isAuthenticated.next(false);
      this.id = null;
      this.users = {};
      console.log("AUTH ERROR", error);
    });
  }

  get isUserAuthenticated() {
    return this.isAuthenticated;
  }

  get authUserInfo() {
    return this.user;
  }

  get userId() {
    return this.id;
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
}
