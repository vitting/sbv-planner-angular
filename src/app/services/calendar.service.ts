import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { Dialog1FieldComponent, Dialog1FieldResult } from '../components/shared/dialog-1-field/dialog-1-field.component';
import { NavbarService } from './navbar.service';
import { CalendarItem } from '../models/calendar.model';
import {
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../components/shared/dialog-confirm/dialog-confirm.component';
import { DialogUtilityService } from './dialog-utility.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private months = [
    "Januar",
    "Februar",
    "Marts",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "December"
  ];

  constructor(
    private dialog: MatDialog,
    private firestoreService: FirestoreService,
    private navbarService: NavbarService,
    private dialogUtility: DialogUtilityService,
    private authService: AuthService) { }

  getMonthName(month: number) {
    return this.months[month];
  }

  getCalendarItems(month: number) {
    return this.firestoreService.getCalendarItems(month);
  }

  async addCalendarItem(month: number) {
    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data: this.dialogUtility.getDialog1FieldData("Ny kalender opgave", "Tilføj", "Opgave tekst", null, 2)
    });

    const result = await dialogRef.afterClosed().toPromise<Dialog1FieldResult>();
    let calendarId = null;
    if (result) {
      this.navbarService.showProgressbar = true;
      calendarId = await this.firestoreService.addCalendarItem(
        this.authService.authUserInfo,
        result.fieldValue,
        month
      );
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(calendarId);
  }

  async editCalendarItem(item: CalendarItem) {
    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data: this.dialogUtility.getDialog1FieldData("Rediger kalender opgave", "Opdater", "Opgave tekst", item.text, 2)
    });

    const result = await dialogRef.afterClosed().toPromise<Dialog1FieldResult>();
    let calendarId = null;
    if (result) {
      this.navbarService.showProgressbar = true;
      calendarId = await this.firestoreService.updateCalendarItem(item.id, result.fieldValue);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(calendarId);
  }

  async deleteItem(item: CalendarItem) {
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData("Slet kalender opgaven", "Vil du slette kalender opgaven?")
    });

    const result = await dialogConfirmRef.afterClosed().toPromise<DialogConfirmResult>();
    let calendarId = null;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      calendarId = await this.firestoreService.deleteCalendarItem(item.id);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(calendarId);
  }
}
