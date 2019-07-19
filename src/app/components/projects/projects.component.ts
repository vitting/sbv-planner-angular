import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectSub: Subscription;

  constructor(
    private authService: AuthService,
    private navbarService: NavbarService,
    private firestoreService: FirestoreService,
    private router: Router) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next({
      title: "Tilslut til projekt",
      icon: {
        collection: "far",
        icon: "clipboard"
      }
    });
    this.getProjects();
  }

  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
  }

  getProjects() {
    // this.projectSub = this.firestoreService.getProjects().pipe(take(1)).subscribe((projects) => {
    //   this.projects = projects;
    // });
    this.projectSub = this.firestoreService.getProjectsNotContainingUserId(this.authService.userId).pipe(take(1)).subscribe((projects) => {
      this.projects = projects;
    });
  }

  async projectAddPersonClick(project: Project) {
    const userId = this.authService.userId;
    const result = await this.firestoreService.addPersonToProject(project.id, userId);
    if (result) {
      this.router.navigate(["/"]);
    }
  }
}
