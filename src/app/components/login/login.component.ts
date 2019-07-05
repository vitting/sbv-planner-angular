
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private navbarService: NavbarService, private authService: AuthService) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Login");

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get("email").value;
      const password = this.loginForm.get("password").value;
      try {
        const user = await this.authService.login(email, password);

        this.navbarService.showLogoutButton.next(true);
        console.log(user);
      } catch (error) {
        console.log(error);
        this.showLoginError(error.code);
      }
    }
  }

  showLoginError(errorCode: string) {
    switch (errorCode) {
      case "auth/invalid-email":
        break;
      case "auth/user-disabled":
        break;
      case "auth/user-not-found":
        break;
      case "auth/wrong-password":
        break;
      default:
    }
  }
}
