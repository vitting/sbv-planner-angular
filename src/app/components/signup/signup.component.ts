import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild("passwordInput", { static: true }) passwordInput: ElementRef;
  @Input() passwordTest: string;
  signupForm: FormGroup;
  showSignupMessage = false;
  messages: string[] = [];
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private logService: LogService,
    private firestoreService: FirestoreService,
    private router: Router) {
  }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Opret ny bruger");

    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordRepeat: new FormControl(null, [Validators.required, this.passwordsNotEqual.bind(this)])
    });
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const email: string = this.signupForm.get("email").value;
      const password: string = this.signupForm.get("password").value;
      const name: string = this.signupForm.get("name").value;

      try {
        this.navbarService.showProgressbar = true;
        const userCred = await this.authService.createUser(email, password);
        if (userCred) {
          const user = await this.firestoreService.addUser(userCred.user.uid, name);
          if (user) {
            this.logService.userAdded(user);
            this.router.navigate(["/message"]);
          }
        }
      } catch (error) {
        this.showSignupError(error.code);
        console.log(error);
      } finally {
        this.navbarService.showProgressbar = false;
      }
    }
  }

  showSignupError(errorCode: string) {
    this.messages = [];
    switch (errorCode) {
      case "auth/email-already-in-use":
        this.messages.push("Den indtastede e-mail adresse eksistere allerede.");
        break;
      case "auth/invalid-email":
        break;
      case "auth/operation-not-allowed":
        break;
      case "auth/weak-password":
        break;
      default:
    }
  }

  passwordsNotEqual(control: FormControl): { [s: string]: boolean } | null {
    if (
      this.passwordInput.nativeElement.value !== control.value) {
      return {
        passwordsNotEqual: true
      };
    }

    return null;
  }
}
