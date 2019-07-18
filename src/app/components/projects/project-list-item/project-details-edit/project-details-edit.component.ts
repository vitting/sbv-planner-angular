import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Summary } from 'src/app/models/summary.model';

@Component({
  selector: 'app-project-details-edit',
  templateUrl: './project-details-edit.component.html',
  styleUrls: ['./project-details-edit.component.scss']
})
export class ProjectDetailsEditComponent implements OnInit {
  @Input() project: Project;
  @Input() summary: Summary;
  @Input() editMode = false;
  @Output() editTasksClick = new EventEmitter<Project>();
  user: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUserInfo(this.project.createdBy);
  }

  editProjectTasksClicked() {
    this.editTasksClick.emit(this.project);
  }
}
