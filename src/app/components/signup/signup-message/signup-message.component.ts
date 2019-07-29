import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-message',
  templateUrl: './signup-message.component.html',
  styleUrls: ['./signup-message.component.scss']
})
export class SignupMessageComponent implements OnInit {
  name: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.name = this.authService.authUserInfo.name;
  }

}
