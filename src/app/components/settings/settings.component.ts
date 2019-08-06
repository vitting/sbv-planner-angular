import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Settings } from 'src/app/models/settings.model';
import { Dialog1FieldComponent, Dialog1FieldData, Dialog1FieldResult } from '../shared/dialog-1-field/dialog-1-field.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  name: string;
  settings: Settings;
  user: User;
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.navbarService.setNavbarTitleWithColor({
      title: "Indstillinger",
      colorState: "setting"
    });

    this.user = this.authService.authUserInfo;
    this.name = this.user.name;
    this.firestoreService.getSettings(this.authService.userId).subscribe((settings) => {
      this.settings = settings;
    });
  }

  async showCalendar({ checked }: MatSlideToggleChange) {
    const result = await this.firestoreService.updateSettingsShowCalendar(this.authService.userId, checked);
  }

  changeName() {
    const data: Dialog1FieldData = {
      title: "Opdater navn",
      buttonText: "Opdater",
      fieldLabel: "Navn",
      fieldValue: this.name,
      multiLine: 0
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
      if (result && result.fieldValue.trim()) {
        this.navbarService.showProgressbar = true;
        await this.firestoreService.updateNameOfUser(this.authService.userId, result.fieldValue);
        this.name = result.fieldValue;
        this.navbarService.showProgressbar = false;
      } else {
        this.navbarService.showProgressbar = false;
      }
    });
  }
}
