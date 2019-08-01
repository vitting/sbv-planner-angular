import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NoDataBoxData } from '../../shared/no-data-box/no-data-box.component';

@Component({
  selector: 'app-user-accept-list',
  templateUrl: './user-accept-list.component.html',
  styleUrls: ['./user-accept-list.component.scss']
})
export class UserAcceptListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  showUndoButton1 = false;
  showUndoButton2 = false;
  disableButton1 = false;
  disableButton2 = false;
  count = 3;
  noData: NoDataBoxData;
  private usersSub: Subscription;
  private timerSub: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.noData = {
      textline1: "Der er ingen brugere der venter på at blive accepteret.",
      textline2: null
    };

    this.usersSub = this.userService.getUsersWaitingForApproval().subscribe((users) => {
      this.users = users;
    });

    this.userService.updateUserMetaLastCheckToAcceptUsers();
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

  acceptAll(accept: boolean) {
    if (accept) {
      this.showUndoButton1 = true;
      this.disableButton2 = true;
    } else {
      this.showUndoButton2 = true;
      this.disableButton1 = true;
    }

    this.timerSub = interval(1000).subscribe(async (val) => {
      this.count--;
      if (this.count === 0) {
        this.undoAll(accept);
        const result = await this.userService.acceptUsers(this.users, accept);
      }
    });
  }

  undoAll(state: boolean) {
    if (state) {
      this.showUndoButton1 = false;
      this.disableButton2 = false;
    } else {
      this.showUndoButton2 = false;
      this.disableButton1 = false;
    }

    this.timerSub.unsubscribe();
    this.timerSub = null;
    this.count = 3;
  }
}
