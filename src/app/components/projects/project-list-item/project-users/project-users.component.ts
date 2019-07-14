import { Component, OnInit, Input } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit {
  @Input() projectUsers: User[] = [];
  authUserId = "";
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authUserId = this.authService.userId;
  }

}
