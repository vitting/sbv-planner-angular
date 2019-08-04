import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {
  DialogConfirmData,
  DialogConfirmResult,
  DialogConfirmAction,
  DialogConfirmComponent
} from '../components/shared/dialog-confirm/dialog-confirm.component';
import { FirestoreService } from './firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from './navbar.service';
import { AuthService } from './auth.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private navbarService: NavbarService,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private logService: LogService,
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

  getUsers() {
    return this.firestoreService.getUsersSorted(true);
  }

  updateUserMetaLastCheckToAcceptUsers() {
    return this.firestoreService.updateUserMetaLastCheckToAcceptUsers(this.authService.userId);
  }

  updateUserAdminState(user: User, state: boolean) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Ændre bruger rettighed",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: state ?
        `Er du sikker på du vil gøre` :
        `Er du sikker på du vil fjerne administrator rettigheden fra:`,
      message2: state ? `${user.name}` : `${user.name}?`,
      message3: state ? `til administrator?` : null
    };

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    return new Promise((resolve) => {
      dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
        if (result && result.action === DialogConfirmAction.yes) {
          this.navbarService.showProgressbar = true;
          const success = await this.firestoreService.updateUserAdmin(user.id, state);
          if (success) {
            this.logService.userAdminStateChanged(this.authService.userId, user, state);
          }
          this.navbarService.showProgressbar = false;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  updateUserEditorState(user: User, state: boolean) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Ændre bruger rettighed",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: state ?
        `Er du sikker på du vil gøre` :
        `Er du sikker på du vil fjerne redaktør rettigheden fra:`,
      message2: state ? `${user.name}` : `${user.name}?`,
      message3: state ? `til redaktør?` : null
    };

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    return new Promise((resolve) => {
      dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
        if (result && result.action === DialogConfirmAction.yes) {
          this.navbarService.showProgressbar = true;
          const success = await this.firestoreService.updateUserEditor(user.id, state);
          if (success) {
            this.logService.userEditorStateChanged(this.authService.userId, user, state);
          }
          this.navbarService.showProgressbar = false;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  updateUserActiveState(user: User, state: boolean) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Ændre bruger rettighed",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: state ?
        `Er du sikker på du vil aktivere` :
        `Er du sikker på du vil deaktivere`,
      message2: `${user.name}?`
    };

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    return new Promise((resolve) => {
      dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
        if (result && result.action === DialogConfirmAction.yes) {
          this.navbarService.showProgressbar = true;
          const success = await this.firestoreService.updateUserActive(user.id, state);
          if (success) {
            this.logService.userActiveStateChanged(this.authService.userId, user, state);
          }
          this.navbarService.showProgressbar = false;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
