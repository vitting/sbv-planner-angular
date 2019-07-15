import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubTask } from 'src/app/models/subtask.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

export interface SubTaskCheckboxStateInfo {
  subTask: SubTask;
  completed: boolean;
}

@Component({
  selector: 'app-subtask-list-item',
  templateUrl: './subtask-list-item.component.html',
  styleUrls: ['./subtask-list-item.component.scss']
})
export class SubtaskListItemComponent implements OnInit {
  private loggedInUserAdded = false;
  @Input() subTask: SubTask;
  @Output() addPersonClick: EventEmitter<SubTask> = new EventEmitter<SubTask>();
  @Output() checkboxClick: EventEmitter<SubTaskCheckboxStateInfo> = new EventEmitter<SubTaskCheckboxStateInfo>();
  state = "add";
  users: User[] = [];
  checkValue = false;
  completedUserId: string = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.subTask.users) {
      this.getUsers();
      this.setState();
    }
  }

  private setState() {
    if (this.subTask.completed) {
      this.state = this.loggedInUserAdded ? "completed" : "completed-not-user";
      this.checkValue = true;
      this.completedUserId = this.subTask.updatedBy;
    } else {
      this.state = this.loggedInUserAdded ? "check" : "add";
    }
  }

  private getUsers() {
    const loggedInUserId = this.authService.userId;
    this.subTask.users.forEach((userId) => {
      if (userId === loggedInUserId) {
        this.loggedInUserAdded = true;
      }
      const user = this.authService.getUserInfo(userId);
      this.users.push(user);
    });
  }

  checkboxClicked(status: boolean) {
    this.checkboxClick.next({
      subTask: this.subTask,
      completed: status
    });

    if (status) {
      this.state = "completed";
    } else {
      this.state = "check";
    }
  }

  addMeToSubTask() {
    this.addPersonClick.next(this.subTask);
  }

  removeUser(user: User) {
    // TODO: Add remove user logic
    console.log("REMOVE USER", user);

  }
}
