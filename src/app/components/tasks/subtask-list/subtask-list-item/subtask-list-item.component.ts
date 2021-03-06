import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubTask } from 'src/app/models/subtask.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

export interface SubTaskCheckboxStateInfo {
  subTask: SubTask;
  completed: boolean;
}

export interface SubTaskPerson {
  subTask: SubTask;
  user: User;
}

@Component({
  selector: 'app-subtask-list-item',
  templateUrl: './subtask-list-item.component.html',
  styleUrls: ['./subtask-list-item.component.scss']
})
export class SubtaskListItemComponent implements OnInit {
  private loggedInUserAdded = false;
  @Input() subTask: SubTask;
  @Input() editMode = false;
  @Output() addPersonClick: EventEmitter<SubTask> = new EventEmitter<SubTask>();
  @Output() removePersonClick: EventEmitter<SubTaskPerson> = new EventEmitter<SubTaskPerson>();
  @Output() checkboxClick: EventEmitter<SubTaskCheckboxStateInfo> = new EventEmitter<SubTaskCheckboxStateInfo>();
  @Output() delete: EventEmitter<SubTask> = new EventEmitter<SubTask>();
  @Output() edit: EventEmitter<SubTask> = new EventEmitter<SubTask>();
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
    this.checkboxClick.emit({
      subTask: this.subTask,
      completed: status
    });

    if (status) {
      this.state = "completed";
    } else {
      this.state = "check";
    }
  }

  addPersonToSubTask() {
    this.addPersonClick.emit(this.subTask);
  }

  removePersonFromSubTask(user: User) {
    this.removePersonClick.emit({
      subTask: this.subTask,
      user
    });
  }

  onDelete() {
    this.delete.emit(this.subTask);
  }

  onEdit() {
    this.edit.emit(this.subTask);
  }
}
