import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';
import { map, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private user: User;
  private id: string;

  constructor(private afAuth: AngularFireAuth, private firestoreService: FirestoreService) {
    this.afAuth.user.pipe(switchMap((authUser) => {
      if (authUser) {
        return this.firestoreService.getUser(authUser.uid);
      } else {
        return of(null);
      }
    })).subscribe((user) => {
      this.user = user;
      this.isLoggedIn = user ? true : false;
      this.id = user ? user.uid : null;
      console.log("AUTHSERVICE", user);
    }, (error) => {
      this.user = null;
      this.isLoggedIn = false;
      this.id = null;
      console.log("AUTH ERROR", error);
    });
  }

  get isAuthUserLoggedIn() {
    return this.isLoggedIn;
  }

  get userInfo() {
    return this.user;
  }

  get userId() {
    return this.id;
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
