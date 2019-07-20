import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Summary } from 'src/app/models/summary.model';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

export interface RemoveUserFromProjectResult {
  user: User;
  project: Project;
}

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit, OnDestroy {
  @Input() showDetails = true;
  @Input() showDetailsEdit = false;
  @Input() showUsers = true;
  @Input() enableRemoveUserButton = false;
  @Input() project: Project;
  @Input() projectButtonState = "none"; // none menu addperso
  @Input() editMode = false;
  @Output() editTitleDescClick = new EventEmitter<Project>();
  @Output() editTasksClick = new EventEmitter<Project>();
  @Output() userClick = new EventEmitter<RemoveUserFromProjectResult>();
  @Output() menuClick = new EventEmitter<Project>();
  @Output() addPersonClick = new EventEmitter<Project>();
  @Output() commentsTotalClick = new EventEmitter<Project>();
  @Output() tasksTotalClick = new EventEmitter<Project>();
  @Output() deleteProjectClick = new EventEmitter<Project>();
  users: User[] = [];
  summary: Summary = {
    id: '',
    numberOfComments: 0,
    numberOfItems: 0,
    numberOfItemsCompleted: 0
  };
  private summarySub: Subscription;
  constructor(
    private authService: AuthService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjectUsers();

    this.summarySub = this.projectService.getProjectSummary((this.project.id)).subscribe((summary) => {
      this.summary = summary;
    });
  }

  ngOnDestroy(): void {
    if (this.summarySub) {
      this.summarySub.unsubscribe();
    }
  }

  private getProjectUsers() {
    if (this.showUsers && this.project.users) {
      this.project.users.forEach((userId) => {
        const user = this.authService.getUserInfo(userId);
        this.users.push(user);

        if (this.projectButtonState === "addperson") {
          if (userId === this.authService.userId) {
            this.projectButtonState = "none";
          }
        }
      });
    }
  }

  showMenu() {
    this.menuClick.emit(this.project);
  }

  addPerson() {
    this.addPersonClick.emit(this.project);
  }

  commentsTotalClicked() {
    this.commentsTotalClick.emit(this.project);
  }

  tasksClicked() {
    this.tasksTotalClick.emit(this.project);
  }

  userClicked(user: User) {
    this.userClick.emit({
      user,
      project: this.project
    });
  }

  editProjectTitleDescClicked() {
    this.editTitleDescClick.emit(this.project);
  }

  editTasksClicked() {
    this.editTasksClick.emit(this.project);
  }

  deleteProjectClicked() {
    this.deleteProjectClick.emit(this.project);
  }
}
