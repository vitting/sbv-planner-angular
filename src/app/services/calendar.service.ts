import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { Dialog1FieldData, Dialog1FieldComponent, Dialog1FieldResult } from '../components/shared/dialog-1-field/dialog-1-field.component';
import { NavbarService } from './navbar.service';
import { CalendarItem } from '../models/calendar.model';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../components/shared/dialog-confirm/dialog-confirm.component';

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
    private authService: AuthService) { }

  getMonthName(month: number) {
    return this.months[month];
  }

  getCalendarItems(month: number) {
    return this.firestoreService.getCalendarItems(month);
  }

  addCalendarItem(month: number) {
    const data: Dialog1FieldData = {
      title: "Ny kalender opgave",
      buttonText: "Tilføj",
      fieldLabel: "Opgave tekst",
      fieldValue: null,
      multiLine: 2
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
        if (result) {
          this.navbarService.showProgressbar = true;
          const itemId = await this.firestoreService.addCalendarItem(
            this.authService.authUserInfo,
            result.fieldValue,
            month
          );
          this.navbarService.showProgressbar = false;
          resolve(itemId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  editCalendarItem(item: CalendarItem) {
    const data: Dialog1FieldData = {
      title: "Rediger kalender opgave",
      buttonText: "Opdater",
      fieldLabel: "Opgave tekst",
      fieldValue: item.text,
      multiLine: 2
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
        if (result) {
          this.navbarService.showProgressbar = true;
          const itemId = await this.firestoreService.updateCalendarItem(item.id, result.fieldValue);
          this.navbarService.showProgressbar = false;
          resolve(itemId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  deleteItem(item: CalendarItem) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Slet kalender opgaven",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du slette kalender opgaven?",
      message2: null
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
          const itemId = await this.firestoreService.deleteCalendarItem(item.id);
          this.navbarService.showProgressbar = false;
          resolve(itemId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }
}
