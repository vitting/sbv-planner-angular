import { Component, OnInit, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-accept-item',
  templateUrl: './user-accept-item.component.html',
  styleUrls: ['./user-accept-item.component.scss']
})
export class UserAcceptItemComponent implements OnInit {
  @Input() user: User;
  showUndo = false;
  count = 3;
  private timerSub: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  async acceptUserClick(user: User, accepted: boolean) {
    this.showUndo = true;

    this.timerSub = interval(1000).subscribe(async (val) => {
      this.count--;
      if (this.count === 0) {
        this.undoAction();
        const result = await this.userService.acceptUser(user, accepted);
      }
    });
  }

  undoAction() {
    this.timerSub.unsubscribe();
    this.timerSub = null;
    this.showUndo = false;
    this.count = 3;
  }
}
