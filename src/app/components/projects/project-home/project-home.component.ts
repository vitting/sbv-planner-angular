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
import { FilterItem } from '../../shared/filter/filter.component';

@Component({
  selector: 'app-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  projectsSub: Subscription;
  userId: string = null;
  nodata: NoDataBoxData;
  showNoData = false;
  currentMonth = 0;
  showCalendar = true;
  filterTitle = "Projekt filter";
  filterItems: FilterItem[];
  private currentFilter = 1;
  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private projectService: ProjectService,
    private router: Router,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.nodata = {
      textline1: "Du har pt. ikke nogen aktive projekter.",
      textline2: "Tilslutte dig et eksisterende projekt eller opret et nyt."
    };

    this.currentMonth = new Date(Date.now()).getMonth();
    this.navbarService.navbarTitle.next("Forside");
    this.userId = this.authService.userId;
    this.showCalendar = this.authService.authUserSettings.showCalendar;
    this.currentFilter = this.projectService.currentProjectFilter;

    this.filterItems  = [
      {value: 1, text: 'Alle mine projekter', selected: this.currentFilter === 1},
      {value: 2, text: 'Mine projekter med åbne opgaver', selected: this.currentFilter === 2}
    ];

    this.getProjects(this.currentFilter);
  }

  ngOnDestroy(): void {
    if (this.projectsSub) {
      this.projectsSub.unsubscribe();
    }
  }

  private getProjects(filterValue: number) {
    if (this.userId) {
      if (this.projectsSub) {
        this.projectsSub.unsubscribe();
      }
      switch (filterValue) {
        case 1:
          this.projectsSub = this.projectService.getProjectsByUserId().subscribe((projects) => {
            this.showNoData = projects.length === 0;
            this.projects = projects;
          });
          break;
          case 2:
            this.projectService.getProjectWhereSubtasksHasUserAssigned(false).then((projects) => {
              this.projects = projects;
            });
            break;
        default:
          break;
      }
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
            this.gotoNewTemplate();
            break;
          case ProjectHomeMenuResult.newProjectFromTemplate:
            this.gotoNewProjectFromTemplate();
            break;
          default:
            console.log("OTHER", result.action);
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

  gotoNewProjectFromTemplate() {
    this.router.navigate(["/templates/add"]);
  }

  gotoNewTemplate() {
    this.router.navigate(["/templates/edit"]);
  }

  gotoProjects() {
    this.router.navigate(["/projects/join"]);
  }

  gotoComments(project: Project) {
    this.projectService.updateCommentsLastRead(project.id);
    this.router.navigate(["/projects", project.id, "comments"]);
  }

  gotoTasks(project: Project) {
    this.router.navigate(["/projects", project.id, "tasks"]);
  }

  gotoCalendar() {
    this.router.navigate(["/calendar"]);
  }

  async removeUserFromProject(project: Project, user: User) {
    const projectId = await this.projectService.removeUserFromProject(project, user);
    if (projectId) {
      this.getProjects(this.currentFilter);
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
      this.getProjects(this.currentFilter);
    }
  }

  endEditProjectClick(project: Project) {
    this.gotoEditProject(project);
  }

  filterChange(filter: number) {
    this.currentFilter = filter;
    this.projectService.currentProjectFilter = filter;
    this.getProjects(this.currentFilter);
  }
}
