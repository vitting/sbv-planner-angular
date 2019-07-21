import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectSub: Subscription;

  constructor(
    private navbarService: NavbarService,
    private projectService: ProjectService,
    private router: Router) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Tilslut til projekt");

    this.projectSub = this.projectService.getProjectsNotContainingUserId().subscribe((projects) => {
      this.projects = projects;
    });
  }

  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
  }

  async projectAddPersonClick(project: Project) {
    const result = await this.projectService.addUserToProject(project);
    if (result) {
      this.router.navigate(["/"]);
    }
  }
}
