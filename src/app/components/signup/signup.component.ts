import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild("passwordInput", { static: true }) passwordInput: ElementRef;
  signupForm: FormGroup;
  @Input() passwordTest: string;

  constructor(private navbarService: NavbarService, public afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((value) => {
      console.log(value);
    }, (error) => {
      console.log(error);
    });

    this.afAuth.authState.subscribe((value) => {
      console.log(value);
    }, (error) => {
      console.log(error);
    });

    this.afAuth.auth.onAuthStateChanged((value) => {
      console.log(value);
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Opret ny bruger");

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordRepeat: new FormControl(null, [Validators.required, this.passwordsNotEqual.bind(this)])
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const email: string = this.signupForm.get("email").value;
      const password: string = this.signupForm.get("password").value;
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
        (user) => {
          console.log(user);
        }, (error) => {
          console.log(error);
        });
    }
    // console.log(email, password);
    // console.log(this.signupForm);

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

  test() {
    this.afAuth.user.subscribe((user) => {
      console.log(user);
    });
  }

  testlogout() {
    this.afAuth.auth.signOut().then((value) => {
      console.log(value);
    }, (error) => {
      console.log(error);
    });
  }

  testlogin() {
    this.afAuth.auth.signInWithEmailAndPassword("xxxx", "xxxx").then((value) => {
      console.log(value);
    }, (error) => {
      console.log(error);
    });
  }
}
