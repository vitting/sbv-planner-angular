import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private user: firebase.User;
  private userId: string;
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = user ? true : false;
      console.log("AUTHSERVICE", user);
    }, (error) => {
      this.user = null;
      this.isLoggedIn = false;
      console.log("AUTH ERROR", error);
    });
  }

  get isUserLoggedIn() {
    return this.isLoggedIn;
  }

  get userLoggedIn() {
    return this.user;
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
