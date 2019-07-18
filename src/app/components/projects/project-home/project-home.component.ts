import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { FirestoreService, SummaryAction } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProjectHomeItemMenuComponent, ProjectHomeItemMenuResult } from './project-home-item-menu/project-home-item-menu.component';
import { NoDataBoxData } from '../../shared/no-data-box/no-data-box.component';

@Component({
  selector: 'app-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {
  projects$: Observable<Project[]>;
  userId: string = null;
  nodata: NoDataBoxData;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.nodata  = {
      textline1: "Du har endnu ikke nogen aktive projekter.",
      textline2: "Du kan tilslutte dig et eksisterende projekt eller oprette dit eget projekt."
    };

    this.userId = this.authService.userId;
    if (this.userId) {
      this.projects$ = this.firestoreService.getProjectsByUserId(this.userId);
    }
  }

  addMenu() {
    console.log("Show Fab Menu");
  }

  projectItemMenuClick(project: Project) {
    const bottomSheetRef = this.bottomSheet.open(ProjectHomeItemMenuComponent);

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case ProjectHomeItemMenuResult.edit:
            // this.editTask(task);
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

  gotoComments(project: Project) {
    this.router.navigate(["/projects", project.id, "comments"]);
    console.log(project);
  }

  gotoTasks(project: Project) {
    this.router.navigate(["/projects", project.id, "tasks"]);
  }

  test() {
    console.log("PRESS");

  }

  testMenu() {
    console.log("FAB TEST");

  }
}
