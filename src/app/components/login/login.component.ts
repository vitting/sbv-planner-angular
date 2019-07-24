
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private isUserAuthenticatedSub: Subscription;
  loginForm: FormGroup;
  messages: string[] = [];
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Login");

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnDestroy(): void {
    if (this.isUserAuthenticatedSub) {
      this.isUserAuthenticatedSub.unsubscribe();
    }
  }

  async onSubmit() {
    console.log("Execute Login");
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
}
