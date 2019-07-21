import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../../shared/dialog-confirm/dialog-confirm.component';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projects$: Observable<Project[]>;
  editMode = true;
  constructor(
    private navbarService: NavbarService,
    private firestoreService: FirestoreService,
    private router: Router,
    private dialog: MatDialog,
    private projectService: ProjectService
    ) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Rediger Projekter");

    this.projects$ = this.firestoreService.getProjects();
  }

  async addProject() {
    const projectId = await this.projectService.addProject();
    if (projectId) {
      this.showAddTasksDialog(projectId);
    }
  }

  showAddTasksDialog(projectId: string) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Tilføj opgaver",
      button1Text: "Ja",
      button2Text: "Senere",
      message1: "Vil du tilføje opgaver til projektet nu?",
      message2: "Du kan gøre det senere."
    };

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: dialogConfirmData
    });

    dialogConfirmRef.afterClosed().subscribe((result: DialogConfirmResult) => {
      if (result && result.action === DialogConfirmAction.yes) {
        this.router.navigate(["/projects", projectId, "tasks", "edit"]);
      }
    });
  }

  editProjectTasks(item: Project) {
    this.router.navigate(["/projects", item.id, "tasks", "edit"]);
  }

  editTitleDescClick(project: Project) {
    this.projectService.editProject(project);
  }

  editTasksClick(project: Project) {
    this.editProjectTasks(project);
  }

  deleteProjectClick(project: Project) {
    this.projectService.deleteProject(project);
  }
}
