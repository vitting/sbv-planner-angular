import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {
  DialogConfirmData,
  DialogConfirmResult,
  DialogConfirmAction,
  DialogConfirmComponent
} from '../components/shared/dialog-confirm/dialog-confirm.component';
import { FirestoreService } from './firestore.service';
import { FabButtonService } from './fab-button.service';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from './navbar.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private navbarService: NavbarService,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private fabButtonService: FabButtonService,
    private dialog: MatDialog) { }

  async acceptUser(user: User, accepted: boolean) {
    this.navbarService.showProgressbar = true;
    const userId = await this.firestoreService.updateUserAccepted(user.id, accepted);
    this.navbarService.showProgressbar = false;
    return Promise.resolve(userId);
  }

  async acceptUsers(users: User[], accepted: boolean) {
    this.navbarService.showProgressbar = true;
    const result = await this.firestoreService.updateUsersAccepted(users, accepted);
    this.navbarService.showProgressbar = false;
    return Promise.resolve(result);
  }

  getUsersWaitingForApproval() {
    return this.firestoreService.getUsersWaitingForApproval();
  }

  updateUserMetaLastCheckToAcceptUsers() {
    return this.firestoreService.updateUserMetaLastCheckToAcceptUsers(this.authService.userId);
  }
}
