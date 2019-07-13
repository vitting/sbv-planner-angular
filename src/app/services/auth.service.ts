import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';
import { map, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { SplashService } from './splash.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private user: User;
  private id: string;
  private users: { [key: string]: User } = {};

  constructor(private afAuth: AngularFireAuth, private firestoreService: FirestoreService, private splashService: SplashService) {
    this.afAuth.user.pipe(switchMap((authUser) => {
      if (authUser) {
        return this.firestoreService.getUser(authUser.uid);
      } else {
        return of(null);
      }
    })).subscribe((user) => {
      this.user = user;
      this.isLoggedIn = user ? true : false;
      this.id = user ? user.id : null;
      console.log("AUTHSERVICE", user);
    }, (error) => {
      this.user = null;
      this.isLoggedIn = false;
      this.id = null;
      console.log("AUTH ERROR", error);
    });

    this.firestoreService.getUsers().subscribe((users) => {
      users.forEach((user) => {
        this.users[user.id] = user;
      });

      this.splashService.splashShow.next(false);
    });
  }

  get isAuthUserLoggedIn() {
    return this.isLoggedIn;
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
