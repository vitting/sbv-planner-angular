import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-signup-message',
  templateUrl: './signup-message.component.html',
  styleUrls: ['./signup-message.component.scss']
})
export class SignupMessageComponent implements OnInit {
  name = "";
  constructor(private authService: AuthService, private navbarService: NavbarService) { }

  ngOnInit() {
    if (this.authService.authUserInfo) {
      this.name = this.authService.authUserInfo.name;
    }

    this.navbarService.setNavbarTitleWithColor({
      title: "Oprettet",
      colorState: "message"
    });
  }

}
