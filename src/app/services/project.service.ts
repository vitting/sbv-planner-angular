import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../models/project.model';
import {
  Dialog2FieldsComponent,
  Dialog2FieldsResult
} from '../components/shared/dialog-2-fields/dialog-2-fields.component';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import {
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
import { DialogUtilityService } from './dialog-utility.service';

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
    private dialogUtility: DialogUtilityService,
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

  async createProjectFromTemplate(template: Template) {
    this.fabuttonService.showFabButton = false;
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData(
        "Opret projekt",
        "Vil du oprette et nyt projekt fra den valgte skabelon?")
    });

    const result = await dialogConfirmRef.afterClosed().toPromise<DialogConfirmResult>();
    let projectId = null;
    this.fabuttonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      const resultTitle = await this.setTitleForProjectCreatedFromTemplate(template);
      if (resultTitle) {
        this.navbarService.showProgressbar = true;
        projectId = await this.firestoreService.createProjectFromTemplate(
          this.authService.userId,
          template,
          resultTitle.field1Value,
          resultTitle.field2Value);
        this.navbarService.showProgressbar = false;
      }
    }

    return Promise.resolve(projectId);
  }

  async setTitleForProjectCreatedFromTemplate(template: Template): Promise<Dialog2FieldsResult> {
    this.fabuttonService.showFabButton = false;
    const dialogEditRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: this.dialogUtility.getDialog2FieldsData(
        "Titel og beskrivelse for nyt projekt",
        "Gem", "Titel", "Beskrivelse",
        template.title,
        template.description)
    });

    const result = await dialogEditRef.afterClosed().toPromise<Dialog2FieldsResult>();
    this.fabuttonService.showFabButton = true;
    return Promise.resolve(result);
  }

  async addProject(): Promise<string> {
    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: this.dialogUtility.getDialog2FieldsData("Nyt Projekt", "Tilføj", "Titel", "Beskrivelse")
    });

    const result = await dialogCreateRef.afterClosed().toPromise<Dialog2FieldsResult>();
    let projectId = null;
    this.fabuttonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      projectId = await this.firestoreService.addProject(this.authService.userId, result.field1Value, result.field2Value);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(projectId);
  }

  async editProject(project: Project) {
    this.fabuttonService.showFabButton = false;
    const dialogEditRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: this.dialogUtility.getDialog2FieldsData("Rediger Projekt", "Gem", "Titel", "Beskrivelse", project.title, project.description)
    });

    const result = await dialogEditRef.afterClosed().toPromise<Dialog2FieldsResult>();
    let projectId = null;
    this.fabuttonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      projectId = await this.firestoreService.updateProject(
        this.authService.userId,
        project.id,
        result.field1Value,
        result.field2Value);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(projectId);
  }

  async deleteProject(project: Project) {
    this.fabuttonService.showFabButton = false;
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData(
        "Slet projekt",
        "Vil du slette projektet?",
        "Alle opgaver og kommentarer bliver også slettet!")
    });

    const result = await dialogConfirmRef.afterClosed().toPromise<DialogConfirmResult>();
    this.fabuttonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      await this.firestoreService.deleteProject(project.id);
      this.navbarService.showProgressbar = false;
    }
  }

  addUserToProject(project: Project): Promise<string> {
    return this.firestoreService.addUserToProject(project.id, this.authService.userId);
  }

  async removeUserFromProject(project: Project, user: User) {
    this.fabuttonService.showFabButton = false;
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData(
        "Forlad projekt",
        "Vil du forlade projektet?",
        "Du vil blive fjernet fra alle opgaver du ikke har afsluttet.")
    });

    const result = await dialogRef.afterClosed().toPromise<DialogConfirmResult>();
    let projectId = null;
    this.fabuttonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      projectId = await this.firestoreService.removeUserFromProject(project.id, user.id);
    }

    return Promise.resolve(projectId);
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
