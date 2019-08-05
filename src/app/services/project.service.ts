import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../models/project.model';
import {
  Dialog2FieldsData,
  Dialog2FieldsComponent,
  Dialog2FieldsResult
} from '../components/shared/dialog-2-fields/dialog-2-fields.component';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../components/shared/dialog-confirm/dialog-confirm.component';
import { take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { Summary } from '../models/summary.model';
import { NavbarService } from './navbar.service';
import { FabButtonService } from './fab-button.service';
import { Template } from '../models/template.model';

export interface ProjectItemEditModeChange {
  projectId: string;
  editMode: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private currenFilter = 1;
  private itemEditMode: Subject<string> = new Subject<string>();
  private itemsInEditMode: string[] = [];
  private summaryCache: { [key: string]: Summary } = {};
  constructor(
    private dialog: MatDialog,
    private firestoreService: FirestoreService,
    private navbarService: NavbarService,
    private fabuttonService: FabButtonService,
    private authService: AuthService) { }

  get currentProjectFilter() {
    return this.currenFilter;
  }

  set currentProjectFilter(filter: number) {
    this.currenFilter = filter;
  }

  updateCommentsLastRead(projectId: string) {
    return this.firestoreService.updateUserMetaComments(this.authService.userId, projectId);
  }

  addSummaryToCache(projectId: string, summary: Summary) {
    this.summaryCache[projectId] = summary;
  }

  getSummaryFromCache(projectId: string) {
    return this.summaryCache[projectId];
  }

  isProjectItemInEditMode(projectId: string) {
    return this.itemsInEditMode.indexOf(projectId) !== -1;
  }

  setProjectItemEditModeChange(projectId: string, editMode: boolean) {
    if (editMode && this.itemsInEditMode.indexOf(projectId) === -1) {
      this.itemsInEditMode.push(projectId);
    } else {
      this.itemsInEditMode.splice(this.itemsInEditMode.indexOf(projectId));
    }
  }

  setProjectItemEditMode(projectId: string) {
    this.itemEditMode.next(projectId);
  }

  get projectItemEditMode$() {
    return this.itemEditMode;
  }

  getProjectSummary(projectId: string) {
    return this.firestoreService.getSummary(projectId);
  }

  getProjectsByUserId() {
    return this.firestoreService.getProjectsByUserId(this.authService.userId).pipe(take(1));
  }

  getProjectsNotContainingUserId() {
    return this.firestoreService.getProjectsNotContainingUserId(this.authService.userId).pipe(take(1));
  }

  createProjectFromTemplate(template: Template) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Opret project",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du et projekt fra den valgte skabelon?",
      message2: null
    };

    this.fabuttonService.showFabButton = false;
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      this.fabuttonService.showFabButton = true;
      if (result && result.action === DialogConfirmAction.yes) {
        this.navbarService.showProgressbar = true;
        const projectId = await this.firestoreService.createProjectFromTemplate(this.authService.userId, template);
        this.navbarService.showProgressbar = false;
      }
    });
  }

  addProject(): Promise<string> {
    const dialogCreateData: Dialog2FieldsData = {
      title: "Nyt Projekt",
      buttonText: "Tilføj",
      field1Label: "Titel",
      field1Value: null,
      field2Label: "Beskrivelse",
      field2Value: null
    };

    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: dialogCreateData
    });

    return new Promise<string>((resolve) => {
      dialogCreateRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        this.fabuttonService.showFabButton = true;
        if (result) {
          this.navbarService.showProgressbar = true;
          const projectId = await this.firestoreService.addProject(this.authService.userId, result.field1Value, result.field2Value);
          this.navbarService.showProgressbar = false;
          resolve(projectId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  editProject(project: Project) {
    const dialogEditData: Dialog2FieldsData = {
      title: "Rediger Projekt",
      buttonText: "Gem",
      field1Label: "Titel",
      field1Value: project.title,
      field2Label: "Beskrivelse",
      field2Value: project.description
    };

    this.fabuttonService.showFabButton = false;
    const dialogEditRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: dialogEditData
    });

    return new Promise((resolve, reject) => {
      dialogEditRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        this.fabuttonService.showFabButton = true;
        if (result) {
          this.navbarService.showProgressbar = true;
          const projectId = await this.firestoreService.updateProject(
            this.authService.userId,
            project.id,
            result.field1Value,
            result.field2Value);
          this.navbarService.showProgressbar = false;
          resolve(projectId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  deleteProject(project: Project) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Slet projekt",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du slette projektet?",
      message2: "Alle opgaver og kommentarer bliver også slettet!"
    };

    this.fabuttonService.showFabButton = false;
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      this.fabuttonService.showFabButton = true;
      if (result && result.action === DialogConfirmAction.yes) {
        this.navbarService.showProgressbar = true;
        await this.firestoreService.deleteProject(project.id);
        this.navbarService.showProgressbar = false;
      }
    });
  }

  addUserToProject(project: Project): Promise<string> {
    return this.firestoreService.addUserToProject(project.id, this.authService.userId);
  }

  removeUserFromProject(project: Project, user: User) {
    const data: DialogConfirmData = {
      header: "Forlad projekt",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du forlade projektet?",
      message2: "Du vil blive fjernet fra alle opgaver du ikke har afsluttet."
    };

    this.fabuttonService.showFabButton = false;
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
        this.fabuttonService.showFabButton = true;
        if (result && result.action === DialogConfirmAction.yes) {
          const projectId = await this.firestoreService.removeUserFromProject(project.id, user.id);
          resolve(projectId);
        } else {
          resolve(null);
        }
      });
    });
  }

  async getProjectWhereSubtasksHasUserAssigned(completed: boolean) {
    const projectIds: string[] = [];
    const subTasks = await this.firestoreService.getSubTasksByUser(this.authService.userId, completed).pipe(take(1)).toPromise();
    for (const subTask of subTasks) {
      if (projectIds.indexOf(subTask.projectId) === -1) {
        projectIds.push(subTask.projectId);
      }
    }

    return this.getProjectsByProjectIds(projectIds);
  }

  private async getProjectsByProjectIds(projectIds: string[]) {
    const projects: Project[] = [];

    for (const projectId of projectIds) {
      const project = await this.firestoreService.getProject(projectId);
      projects.push(project);
    }

    return projects;
  }
}
