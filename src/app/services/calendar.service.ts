import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';

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
    private authService: AuthService) { }

  getMonthName(month: number) {
    return this.months[month];
  }

  addTask() {

  }

  deleteTask() {

  }
}
