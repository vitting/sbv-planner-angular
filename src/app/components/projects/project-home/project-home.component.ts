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

  projectItemClick(project: Project) {
    console.log(project);
    this.router.navigate(["/projects", project.id, "tasks"]);
  }

  // async test(project: Project) {
  //   // this.firestoreService.addSummary(project.id);
  //   // await this.firestoreService.updateSummaryComments(project.id, SummaryAction.delete);
  //   // console.log(item);

  //   // item.subscribe((result) => {
  //   //   console.log(result);

  //   // });
  // }
}
