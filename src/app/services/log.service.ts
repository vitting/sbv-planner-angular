import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private firestoreService: FirestoreService) { }

  userAdded(user: User) {
    const message = `New user created: ${user.id} / ${user.name}`;
    return this.firestoreService.addToLog(message, user.id, "user", "userAdd");
  }

  userAdminStateChanged(authUserId: string, user: User, state: boolean) {
    const message = `User: ${user.id} / ${user.name} | admin state changed to: ${state} | by: ${authUserId}`;
    return this.firestoreService.addToLog(message, authUserId, "user", "userAdmin");
  }

  userEditorStateChanged(authUserId: string, user: User, state: boolean) {
    const message = `User: ${user.id} / ${user.name} | editor state changed to: ${state} | by: ${authUserId}`;
    return this.firestoreService.addToLog(message, authUserId, "user", "userEditor");
  }

  userActiveStateChanged(authUserId: string, user: User, state: boolean) {
    const message = `User: ${user.id} / ${user.name} | active state changed to: ${state} | by: ${authUserId}`;
    return this.firestoreService.addToLog(message, authUserId, "user", "userActive");
  }

  error(authUserId: string, error: any, component: string = "") {
    return this.firestoreService.addToLog(error, authUserId, "error", "error", component);
  }

  info(authUserId: string, message: any, component: string = "") {
    return this.firestoreService.addToLog(message, authUserId, "info", "info", component);
  }
}
