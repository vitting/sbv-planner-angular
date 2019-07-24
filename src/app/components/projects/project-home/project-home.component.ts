import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProjectHomeItemMenuComponent, ProjectHomeItemMenuResult } from './project-home-item-menu/project-home-item-menu.component';
import { NoDataBoxData } from '../../shared/no-data-box/no-data-box.component';
import { ProjectHomeMenuComponent, ProjectHomeMenuResult } from './project-home-menu/project-home-menu.component';
import { RemoveUserFromProjectResult } from '../project-list-item/project-list-item.component';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {
  projects: Project[] = [];
  projectsSub: Subscription;
  userId: string = null;
  nodata: NoDataBoxData;
  showNoData = false;
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private projectService: ProjectService,
    private router: Router,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.nodata = {
      textline1: "Du har endnu ikke nogen aktive projekter.",
      textline2: "Du kan tilslutte dig et eksisterende projekt eller oprette dit eget projekt."
    };
    this.navbarService.navbarTitle.next("Mine projekter");
    this.userId = this.authService.userId;
    this.getProjects();

    // this.navbarService.showIndicator = true;
  }

  private getProjects() {
    if (this.userId) {
      this.projectsSub = this.projectService.getProjectsByUserId().subscribe((projects) => {
        this.showNoData = projects.length === 0;
        this.projects = projects;
      });
    }
  }

  addMenu() {
    const bottomSheetRef = this.bottomSheet.open(ProjectHomeMenuComponent);

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case ProjectHomeMenuResult.joinProject:
            this.gotoProjects();
            break;
          case ProjectHomeMenuResult.newProject:
            this.gotoNewProjects();
            break;
          case ProjectHomeMenuResult.newTemplate:
            // this.deleteTask(task);
            break;
          default:
            console.log("OTHER");
        }
      }
    });
  }

  projectItemMenuClick(project: Project) {
    const bottomSheetRef = this.bottomSheet.open(ProjectHomeItemMenuComponent, {
      data: this.projectService.isProjectItemInEditMode(project.id)
    });

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case ProjectHomeItemMenuResult.gotoTasks:
            this.gotoTasks(project);
            break;
          case ProjectHomeItemMenuResult.gotoComments:
            this.gotoComments(project);
            break;
          case ProjectHomeItemMenuResult.editProject:
            this.gotoEditProject(project);
            break;
          case ProjectHomeItemMenuResult.removeFromProject:
            this.removeUserFromProject(project, this.authService.authUserInfo);
            break;
          default:
            console.log("OTHER");
        }
      }
    });
  }

  gotoEditProject(project: Project) {
    this.projectService.setProjectItemEditMode(project.id);
  }

  gotoEditTasks(project: Project) {
    this.router.navigate(["/projects", project.id, "tasks", "edit"]);
  }

  gotoNewProjects() {
    this.router.navigate(["/projects/edit"]);
  }

  gotoProjects() {
    this.router.navigate(["/projects"]);
  }

  gotoComments(project: Project) {
    this.router.navigate(["/projects", project.id, "comments"]);
  }

  gotoTasks(project: Project) {
    this.router.navigate(["/projects", project.id, "tasks"]);
  }

  async removeUserFromProject(project: Project, user: User) {
    const projectId = await this.projectService.removeUserFromProject(project, user);
    if (projectId) {
      this.getProjects();
    }
  }

  async removeUserClick(removeUserResult: RemoveUserFromProjectResult) {
    this.removeUserFromProject(removeUserResult.project, removeUserResult.user);
  }

  editTasksClick(project: Project) {
    this.gotoEditTasks(project);
  }

  async editTitleDescClick(project: Project) {
    const projectId = await this.projectService.editProject(project);
    if (projectId) {
      this.getProjects();
    }
  }

  endEditProjectClick(project: Project) {
    this.gotoEditProject(project);
  }
}
