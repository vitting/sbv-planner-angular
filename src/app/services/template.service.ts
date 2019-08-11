import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  Dialog2FieldsComponent,
  Dialog2FieldsResult
} from '../components/shared/dialog-2-fields/dialog-2-fields.component';
import { FabButtonService } from './fab-button.service';
import { NavbarService } from './navbar.service';
import { Template, TemplateTask, TemplateSubTask } from '../models/template.model';
import {
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../components/shared/dialog-confirm/dialog-confirm.component';
import {
  Dialog1FieldComponent,
  Dialog1FieldResult
} from '../components/shared/dialog-1-field/dialog-1-field.component';
import { DialogUtilityService } from './dialog-utility.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private dialog: MatDialog,
    private navbarService: NavbarService,
    private dialogUtility: DialogUtilityService,
    private fabuttonService: FabButtonService) { }

  getTemplate(templateId: string) {
    return this.firestoreService.getTemplate(templateId);
  }

  getTemplates() {
    return this.firestoreService.getTemplates();
  }

  getTemplateTasks(templateId: string) {
    return this.firestoreService.getTemplateTasks(templateId);
  }

  getTemplateSubTasks(templateTaskId: string) {
    return this.firestoreService.getTemplateSubTasks(templateTaskId);
  }

  async addTemplate() {
    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: this.dialogUtility.getDialog2FieldsData("Ny Skabelon", "Tilføj", "Titel", "Beskrivelse")
    });

    const result = await dialogCreateRef.afterClosed().toPromise<Dialog2FieldsResult>();
    let templateId = null;
    this.fabuttonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      templateId = await this.firestoreService.addTemplate(this.authService.authUserInfo, result.field1Value, result.field2Value);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(templateId);
  }

  async updateTemplate(template: Template) {
    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: this.dialogUtility.getDialog2FieldsData("Rediger Skabelon", "Gem", "Titel", "Beskrivelse", template.title, template.description)
    });

    const result = await dialogCreateRef.afterClosed().toPromise<Dialog2FieldsResult>();
    let templateId = null;
    this.fabuttonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      templateId = await this.firestoreService.updateTemplate(
        this.authService.authUserInfo,
        template.id,
        result.field1Value,
        result.field2Value);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(templateId);
  }

  async deleteTemplate(template: Template) {
    this.fabuttonService.showFabButton = false;
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData(
        "Slet skabelon", "Vil du skabelonen?", "Alle opgave grupper og opgaver bliver også slettet!")
    });

    const result = await dialogConfirmRef.afterClosed().toPromise<DialogConfirmResult>();
    let templateId = null;
    this.fabuttonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      templateId = await this.firestoreService.deleteTemplate(template.id);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(templateId);
  }

  async addTemplateTask(template: Template) {
    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: this.dialogUtility.getDialog2FieldsData("Ny opgave gruppe", "Tilføj", "Titel", "Beskrivelse")
    });

    const result = await dialogCreateRef.afterClosed().toPromise<Dialog2FieldsResult>();
    let templateTaskId = null;
    this.fabuttonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      templateTaskId = await this.firestoreService.addTemplateTask(template.id, result.field1Value, result.field2Value);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(templateTaskId);
  }

  async updateTemplateTask(templateTask: TemplateTask) {
    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: this.dialogUtility.getDialog2FieldsData(
        "Rediger opgave gruppe", "Gem", "Titel", "Beskrivelse", templateTask.title, templateTask.description)
    });

    const result = await dialogCreateRef.afterClosed().toPromise<Dialog2FieldsResult>();
    let templateTaskId = null;
    this.fabuttonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      templateTaskId = await this.firestoreService.updateTemplateTask(
        templateTask.id,
        result.field1Value,
        result.field2Value);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(templateTaskId);
  }

  async deleteTemplateTask(templateTask: TemplateTask) {
    this.fabuttonService.showFabButton = false;
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData(
        "Slet opgave gruppe", "Vil du opgave gruppen?", "Alle opgaver tilkynyttet til gruppen bliver også slettet!")
    });

    const result = await dialogConfirmRef.afterClosed().toPromise<DialogConfirmResult>();
    let templateTaskId = null;
    this.fabuttonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      templateTaskId = await this.firestoreService.deleteTemplateTask(templateTask.id);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(templateTaskId);
  }

  async addTemplateSubTask(templateTask: TemplateTask) {
    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog1FieldComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: this.dialogUtility.getDialog1FieldData("Ny opgave", "Tilføj", "Opgave", null, 3)
    });

    const result = await dialogCreateRef.afterClosed().toPromise<Dialog1FieldResult>();
    let templateSubTaskId = null;
    this.fabuttonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      templateSubTaskId = await this.firestoreService.addTemplateSubTask(templateTask, result.fieldValue);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(templateSubTaskId);
  }

  async updateTemplateSubTask(templateSubTask: TemplateSubTask) {
    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog1FieldComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: this.dialogUtility.getDialog1FieldData("Rediger opgave", "Gem", "Opgave", templateSubTask.title, 3)
    });

    const result = await dialogCreateRef.afterClosed().toPromise<Dialog1FieldResult>();
    let templateSubTaskId = null;
    this.fabuttonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      templateSubTaskId = await this.firestoreService.updateTemplateSubTask(templateSubTask.id, result.fieldValue);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(templateSubTaskId);
  }

  async deleteTemplateSubTask(templateSubTask: TemplateSubTask) {
    this.fabuttonService.showFabButton = false;
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData("Slet opgaven", "Vil du opgavem?")
    });

    const result = await dialogConfirmRef.afterClosed().toPromise<DialogConfirmResult>();
    let templateSubTaskId = null;
    this.fabuttonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      templateSubTaskId = await this.firestoreService.deleteTemplateSubTask(templateSubTask.id);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(templateSubTaskId);
  }
}
