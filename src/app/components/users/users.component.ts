import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable, interval, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private usersSub: Subscription;
  constructor(private firestoreService: FirestoreService, private userService: UserService) { }

  ngOnInit() {
    this.usersSub = this.firestoreService.getUsersWaitingForApproval().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }
}
