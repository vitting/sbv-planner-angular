import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Summary } from 'src/app/models/summary.model';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

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
  @Input() project: Project;
  @Input() showDetails = true;
  @Input() showDetailsEdit = false;
  @Input() showUsers = true;
  @Input() enableRemoveUserButton = false;
  @Input() projectButtonState = "none"; // none menu addperso
  @Input() editMode = false;
  @Input() passiveMode = false;
  @Output() editTitleDescClick = new EventEmitter<Project>();
  @Output() editTasksClick = new EventEmitter<Project>();
  @Output() userClick = new EventEmitter<RemoveUserFromProjectResult>();
  @Output() menuClick = new EventEmitter<Project>();
  @Output() addPersonClick = new EventEmitter<Project>();
  @Output() commentsTotalClick = new EventEmitter<Project>();
  @Output() tasksTotalClick = new EventEmitter<Project>();
  @Output() deleteProjectClick = new EventEmitter<Project>();
  @Output() endEditProjectClick = new EventEmitter<Project>();
  users: User[] = [];
  tasks: Task[] = [];
  summary: Summary = {
    id: '',
    numberOfComments: 0,
    numberOfItems: 0,
    numberOfItemsCompleted: 0,
    commentsUpdatedAt: null
  };
  showCommentIndicator = false;
  private summarySub: Subscription;
  private projectItemEditModeSub: Subscription;
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private taskService: TaskService) { }

  ngOnInit() {
    this.getProjectUsers();
    if (this.projectButtonState !== "addperson" && this.projectButtonState !== "none") {
      this.setEditModeState(this.projectService.isProjectItemInEditMode(this.project.id));

      this.projectItemEditModeSub = this.projectService.projectItemEditMode$.subscribe((projectId: string) => {
        if (projectId && projectId === this.project.id) {
          this.setEditModeState(!this.editMode);
          this.projectService.setProjectItemEditModeChange(projectId, this.editMode);
        }
      });
    }

    if (!this.editMode) {
      this.summarySub = this.projectService.getProjectSummary((this.project.id)).subscribe((summary) => {
        this.summary = summary;

        if (this.authService.authUserMeta && this.authService.authUserMeta[this.project.id]) {
          const projectItemMeta = this.authService.authUserMeta[this.project.id];
          if (projectItemMeta.commentsLastRead.toDate().getTime() <= summary.commentsUpdatedAt.toDate().getTime()) {
            this.showCommentIndicator = true;
          } else {
            this.showCommentIndicator = false;
          }
        }

        this.projectService.addSummaryToCache(this.project.id, summary);
      });
    } else {
      this.summary = this.projectService.getSummaryFromCache(this.project.id);
    }
  }

  ngOnDestroy(): void {
    if (this.summarySub) {
      this.summarySub.unsubscribe();
    }

    if (this.projectItemEditModeSub) {
      this.projectItemEditModeSub.unsubscribe();
    }
  }

  private setEditModeState(editMode: boolean) {
    this.editMode = editMode;
    this.enableRemoveUserButton = !editMode;

    this.projectButtonState = editMode ? "endedit" : "menu";
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

  endEditProjectClicked() {
    this.endEditProjectClick.emit(this.project);
  }
}
