import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { NoDataBoxData } from '../shared/no-data-box/no-data-box.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectSub: Subscription;
  nodata: NoDataBoxData;
  showNoData = false;
  constructor(
    private navbarService: NavbarService,
    private projectService: ProjectService,
    private router: Router) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Tilslut til projekt");

    this.nodata = {
      textline1: "Der endnu ikke oprettet nogen projekter.",
      textline2: "Vær den første til at oprette et projekt"
    };

    this.projectSub = this.projectService.getProjectsNotContainingUserId().subscribe((projects) => {
      this.showNoData = projects.length === 0;
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

  addNewProject() {
    this.router.navigate(["/projects"]);
  }
}
