import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { FirestoreService, SummaryAction } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProjectHomeItemMenuComponent, ProjectHomeItemMenuResult } from './project-home-item-menu/project-home-item-menu.component';
import { NoDataBoxData } from '../../shared/no-data-box/no-data-box.component';
import { ProjectHomeMenuComponent, ProjectHomeMenuResult } from './project-home-menu/project-home-menu.component';
import { RemovePersonFromProjectResult } from '../project-list-item/project-list-item.component';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction } from '../../shared/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from 'src/app/services/navbar.service';

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
    private firestoreService: FirestoreService,
    private dialog: MatDialog,
    private router: Router,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.nodata = {
      textline1: "Du har endnu ikke nogen aktive projekter.",
      textline2: "Du kan tilslutte dig et eksisterende projekt eller oprette dit eget projekt."
    };
    this.navbarService.navbarTitle.next({
      title: "Mine projekter",
      icon: {
        collection: "far",
        icon: "lightbulb"
      }
    });
    this.userId = this.authService.userId;
    this.getProjects();
  }

  private getProjects() {
    if (this.userId) {
      this.projectsSub = this.firestoreService.getProjectsByUserId(this.userId).pipe(take(1)).subscribe((projects) => {
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
    const bottomSheetRef = this.bottomSheet.open(ProjectHomeItemMenuComponent);

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case ProjectHomeItemMenuResult.edit:
            break;
          case ProjectHomeItemMenuResult.delete:
            // this.deleteTask(task);
            break;
          default:
            console.log("OTHER");
        }
      }
    });
  }

  gotoNewProjects() {
    this.router.navigate(["/projects/edit"]);
  }

  gotoProjects() {
    this.router.navigate(["/projects"]);
  }

  gotoComments(project: Project) {
    this.router.navigate(["/projects", project.id, "comments"]);
    console.log(project);
  }

  gotoTasks(project: Project) {
    this.router.navigate(["/projects", project.id, "tasks"]);
  }

  removeUserClick(removePersonResult: RemovePersonFromProjectResult) {
    const data: DialogConfirmData = {
      header: "Fjern fra projekt",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du fjerne dig fra projektet?",
      message2: null
    };

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      if (result && result.action === DialogConfirmAction.yes) {
        const projectId = await this.firestoreService.removePersonFromProject(removePersonResult.project.id, removePersonResult.user.id);
        if (projectId) {
          this.getProjects();
        }
      }
    });
  }

  test() {
    console.log("PRESS");

  }

  testMenu() {
    console.log("FAB TEST");

  }
}
