import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private firestoreService: FirestoreService, private authService: AuthService) { }

  userAdded(user: User) {
    const message = `New user created: ${user.id} / ${user.name}`;
    return this.firestoreService.addToLog(message, user.id, "userAdd");
  }

  userAdminStateChanged(user: User, state: boolean) {
    const message = `User: ${user.id} / ${user.name} | admin state changed to: ${state} | by: ${this.authService.userId}`;
    return this.firestoreService.addToLog(message, this.authService.userId, "userAdmin");
  }

  userEditorStateChanged(user: User, state: boolean) {
    const message = `User: ${user.id} / ${user.name} | editor state changed to: ${state} | by: ${this.authService.userId}`;
    return this.firestoreService.addToLog(message, this.authService.userId, "userEditor");
  }

  userActiveStateChanged(user: User, state: boolean) {
    const message = `User: ${user.id} / ${user.name} | active state changed to: ${state} | by: ${this.authService.userId}`;
    return this.firestoreService.addToLog(message, this.authService.userId, "userActive");
  }

  error(error: string) {
    return this.firestoreService.addToLog(error, this.authService.userId, "error");
  }
}
