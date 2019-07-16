import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Summary } from 'src/app/models/summary.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit, OnDestroy {
  @Input() showDetails = true;
  @Input() showDetailsEdit = false;
  @Input() showUsers = true;
  @Input() project: Project;
  @Output() menuClick = new EventEmitter<Project>();
  @Output() commentsTotalClick = new EventEmitter<Project>();
  @Output() tasksTotalClick = new EventEmitter<Project>();
  users: User[] = [];
  summary: Summary;
  private summarySub: Subscription;
  constructor(private authService: AuthService, private firestoreService: FirestoreService) { }

  ngOnInit() {
    if (this.project.users) {
      this.project.users.forEach((userId) => {
        const user = this.authService.getUserInfo(userId);
        this.users.push(user);
      });
    }

    this.summarySub = this.firestoreService.getSummary(this.project.id).subscribe((summary) => {
      this.summary = summary;
    });
  }

  ngOnDestroy(): void {
    if (this.summarySub) {
      this.summarySub.unsubscribe();
    }
  }

  showMenu() {
    this.menuClick.emit(this.project);
  }

  commentsTotalClicked() {
    this.commentsTotalClick.emit(this.project);
  }

  tasksClicked() {
    this.tasksTotalClick.emit(this.project);
  }
}
