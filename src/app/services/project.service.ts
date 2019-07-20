import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../models/project.model';
import {
  Dialog2FieldsData,
  Dialog2FieldsComponent,
  Dialog2FieldsResult } from '../components/shared/dialog-2-fields/dialog-2-fields.component';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction } from '../components/shared/dialog-confirm/dialog-confirm.component';
import { take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { Summary } from '../models/summary.model';

export interface ProjectItemEditModeChange {
  projectId: string;
  editMode: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private itemEditMode: Subject<string> = new Subject<string>();
  private itemsInEditMode: string[] = [];
  private summaryCache: { [key: string]: Summary } = {};
  constructor(private dialog: MatDialog, private firestoreService: FirestoreService, private authService: AuthService) { }

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

  addProject(): Promise<string> {
    const dialogCreateData: Dialog2FieldsData = {
      title: "Nyt Projekt",
      buttonText: "Tilføj",
      field1Label: "Titel",
      field1Value: null,
      field2Label: "Beskrivelse",
      field2Value: null
    };

    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: dialogCreateData
    });

    return new Promise<string>((resolve, reject) => {
      dialogCreateRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        if (result) {
          const projectId = await this.firestoreService.addProject(this.authService.userId, result.field1Value, result.field2Value);
          resolve(projectId);
        } else {
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

    const dialogEditRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: dialogEditData
    });

    return new Promise((resolve, reject) => {
      dialogEditRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        if (result) {
          const projectId = await this.firestoreService.updateProject(
            this.authService.userId,
            project.id,
            result.field1Value,
            result.field2Value);
          resolve(projectId);
        } else {
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

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      if (result && result.action === DialogConfirmAction.yes) {
        await this.firestoreService.deleteProject(project.id);
      }
    });
  }

  addUserToProject(project: Project): Promise<string> {
    return this.firestoreService.addPersonToProject(project.id, this.authService.userId);
  }

  removeUserFromProject(project: Project, user: User) {
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

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
        if (result && result.action === DialogConfirmAction.yes) {
          const projectId = await this.firestoreService.removePersonFromProject(project.id, user.id);
          resolve(projectId);
        } else {
          resolve(null);
        }
      });
    });
  }
}
