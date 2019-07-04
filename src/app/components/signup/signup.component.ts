import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild("passwordInput", { static: true }) passwordInput: ElementRef;
  signupForm: FormGroup;
  @Input() passwordTest: string;

  constructor(private navbarService: NavbarService, public afAuth: AngularFireAuth, private authService: AuthService) {
    // this.afAuth.user.subscribe((value) => {
    //   console.log("user", value);
    // }, (error) => {
    //   console.log(error);
    // });

    // this.afAuth.authState.subscribe((value) => {
    //   console.log("authState", value);
    // }, (error) => {
    //   console.log(error);
    // });

    // this.afAuth.auth.onAuthStateChanged((value) => {
    //   console.log("onAuthStateChanged", value);
    // }, (error) => {
    //   console.log(error);
    // });
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
      try {
        const user = await this.authService.createUser(email, password);
        console.log(user);
      } catch (error) {
       this.showSignupError(error.code);
       console.log(error);
      }
    }
  }

  showSignupError(errorCode: string) {
    switch (errorCode) {
      case "auth/email-already-in-use":
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
