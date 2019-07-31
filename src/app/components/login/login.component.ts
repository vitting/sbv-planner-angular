import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dialog1FieldData, Dialog1FieldComponent, Dialog1FieldResult } from '../shared/dialog-1-field/dialog-1-field.component';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private isUserAuthenticatedSub: Subscription;
  loginForm: FormGroup;
  messages: string[] = [];
  showForm = true;
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Login");

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    this.showForm = !this.authService.authUserInfo;
  }

  ngOnDestroy(): void {
    if (this.isUserAuthenticatedSub) {
      this.isUserAuthenticatedSub.unsubscribe();
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get("email").value;
      const password = this.loginForm.get("password").value;
      try {
        await this.authService.login(email, password);
        this.isUserAuthenticatedSub = this.authService.isUserAuthenticated$.subscribe((isAuth) => {
          if (isAuth) {
            this.router.navigate(["/"]);
          }
        });
      } catch (error) {
        console.log(error);
        this.showLoginError(error.code);
      }
    }
  }

  showLoginError(errorCode: string) {
    this.messages = [];
    switch (errorCode) {
      case "auth/invalid-email":
        // tslint:disable-next-line: max-line-length
        this.messages.push("Den indtastede e-mail adresse eller kodeord er ikke rigtigt. Tjek at du har indtastede din e-mail adresse og dit kodeord korrekt.");
        break;
      case "auth/user-disabled":
        break;
      case "auth/user-not-found":
        // tslint:disable-next-line: max-line-length
        this.messages.push("Den indtastede e-mail adresse eller kodeord er ikke rigtigt. Tjek at du har indtastede din e-mail adresse og dit kodeord korrekt.");
        break;
      case "auth/wrong-password":
        // tslint:disable-next-line: max-line-length
        this.messages.push("Den indtastede e-mail adresse eller kodeord er ikke rigtigt. Tjek at du har indtastede din e-mail adresse og dit kodeord korrekt.");
        break;
      default:
    }
  }

  async logout() {
    await this.navbarService.logout();
    this.showForm = !this.authService.authUserInfo;
  }

  forgotPassword() {
    console.log("FORGOT PASSWORD");

    const data: Dialog1FieldData = {
      title: "Nulstil kodeord",
      buttonText: "Send",
      fieldLabel: "E-mail",
      fieldValue: null,
      multiLine: 0,
      type: "email"
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data
    });

    dialogRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
      if (result) {
        const email = result.fieldValue.toLowerCase().trim();
        if (this.checkEmailAddress(email)) {
          try {
            await this.authService.sendResetPasswordEmail(email);
            this.emailSentConfirm(email);
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  }

  private checkEmailAddress(email: string) {
    // tslint:disable-next-line: max-line-length
    return email.trim().match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  }

  private emailSentConfirm(email: string) {
    const dialogConfirmData: DialogConfirmData = {
      header: "E-mail afsendt",
      button1Text: null,
      button2Text: null,
      buttonOkText: "Ok",
      // tslint:disable-next-line: max-line-length
      message1: "E-mail afsendt. Du vil i løbet af et par minutter modtage en e-mail med et link, hvor du kan lave et nyt kodeord.",
      message2: "Hvis du ikke modtager en e-mail så tjek din e-mail spam mappe.",
      message3: `E-mail sendt til: ${email}`
    };

    this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });
  }
}
