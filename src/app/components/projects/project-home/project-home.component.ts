import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { FirestoreService, SummaryAction } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {
  projects$: Observable<Project[]>;
  userId: string = null;
  constructor(private authService: AuthService, private firestoreService: FirestoreService, private router: Router) { }

  ngOnInit() {
    this.userId = this.authService.userId;
    if (this.userId) {
      this.projects$ = this.firestoreService.getProjectsByUserId(this.userId);
    }
  }

  showMenu() {
    console.log("Show Fab Menu");
  }

  projectItemMenuClick(project: Project) {
    console.log(project);
  }

  gotoComments(project: Project) {
    this.router.navigate(["/projects", project.id, "comments"]);
    console.log(project);
  }

  gotoTasks(project: Project) {
    this.router.navigate(["/projects", project.id, "tasks"]);
  }
}
