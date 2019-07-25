import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  Dialog2FieldsData,
  Dialog2FieldsComponent,
  Dialog2FieldsResult } from '../components/shared/dialog-2-fields/dialog-2-fields.component';
import { FabButtonService } from './fab-button.service';
import { NavbarService } from './navbar.service';
import { Template, TemplateTask, TemplateSubTask } from '../models/template.model';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction } from '../components/shared/dialog-confirm/dialog-confirm.component';
import {
  Dialog1FieldData,
  Dialog1FieldComponent,
  Dialog1FieldResult } from '../components/shared/dialog-1-field/dialog-1-field.component';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private dialog: MatDialog,
    private navbarService: NavbarService,
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

  addTemplate() {
    const dialogCreateData: Dialog2FieldsData = {
      title: "Ny Skabelon",
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

    return new Promise<string>((resolve, reject) => {
      dialogCreateRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        this.fabuttonService.showFabButton = true;
        if (result) {
          this.navbarService.showProgressbar = true;
          const templateId = await this.firestoreService.addTemplate(this.authService.authUserInfo, result.field1Value, result.field2Value);
          this.navbarService.showProgressbar = false;
          resolve(templateId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  updateTemplate(template: Template) {
    const dialogCreateData: Dialog2FieldsData = {
      title: "Rediger Skabelon",
      buttonText: "Gem",
      field1Label: "Titel",
      field1Value: template.title,
      field2Label: "Beskrivelse",
      field2Value: template.description
    };

    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: dialogCreateData
    });

    return new Promise<string>((resolve, reject) => {
      dialogCreateRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        this.fabuttonService.showFabButton = true;
        if (result) {
          this.navbarService.showProgressbar = true;
          const templateId = await this.firestoreService.updateTemplate(
            this.authService.authUserInfo,
            template.id,
            result.field1Value,
            result.field2Value);
          this.navbarService.showProgressbar = false;
          resolve(templateId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  deleteTemplate(template: Template) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Slet skabelon",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du skabelonen?",
      message2: "Alle opgave grupper og opgaver bliver også slettet!"
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
        const templateId = await this.firestoreService.deleteTemplate(template.id);
        this.navbarService.showProgressbar = false;
      }
    });
  }

  addTemplateTask(template: Template) {
    const dialogCreateData: Dialog2FieldsData = {
      title: "Ny opgave gruppe",
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

    return new Promise<string>((resolve, reject) => {
      dialogCreateRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        this.fabuttonService.showFabButton = true;
        if (result) {
          this.navbarService.showProgressbar = true;
          const templateTaskId = await this.firestoreService.addTemplateTask(template.id, result.field1Value, result.field2Value);
          this.navbarService.showProgressbar = false;
          resolve(templateTaskId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  updateTemplateTask(templateTask: TemplateTask) {
    const dialogCreateData: Dialog2FieldsData = {
      title: "Rediger opgave gruppe",
      buttonText: "Gem",
      field1Label: "Titel",
      field1Value: templateTask.title,
      field2Label: "Beskrivelse",
      field2Value: templateTask.description
    };

    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: dialogCreateData
    });

    return new Promise<string>((resolve, reject) => {
      dialogCreateRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        this.fabuttonService.showFabButton = true;
        if (result) {
          this.navbarService.showProgressbar = true;
          const templateId = await this.firestoreService.updateTemplateTask(
            templateTask.id,
            result.field1Value,
            result.field2Value);
          this.navbarService.showProgressbar = false;
          resolve(templateId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  deleteTemplateTask(templateTask: TemplateTask) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Slet opgave gruppe",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du opgave gruppen?",
      message2: "Alle opgaver tilkynyttet til gruppen bliver også slettet!"
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
        const templateTaskId = await this.firestoreService.deleteTemplateTask(templateTask.id);
        this.navbarService.showProgressbar = false;
      }
    });
  }

  addTemplateSubTask(templateTask: TemplateTask) {
    const dialogCreateData: Dialog1FieldData = {
      title: "Ny opgave",
      buttonText: "Tilføj",
      fieldLabel: "Opgave",
      fieldValue: null,
      multiLine: 3
    };

    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog1FieldComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: dialogCreateData
    });

    return new Promise<string>((resolve, reject) => {
      dialogCreateRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
        this.fabuttonService.showFabButton = true;
        if (result) {
          this.navbarService.showProgressbar = true;
          const templateSubTaskId = await this.firestoreService.addTemplateSubTask(templateTask, result.fieldValue);
          this.navbarService.showProgressbar = false;
          resolve(templateSubTaskId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  updateTemplateSubTask(templateSubTask: TemplateSubTask) {
    const dialogCreateData: Dialog1FieldData = {
      title: "Rediger opgave",
      buttonText: "Gem",
      fieldLabel: "Opgave",
      fieldValue: templateSubTask.title,
      multiLine: 3
    };

    this.fabuttonService.showFabButton = false;
    const dialogCreateRef = this.dialog.open(Dialog1FieldComponent, {
      maxWidth: '350',
      autoFocus: true,
      data: dialogCreateData
    });

    return new Promise<string>((resolve, reject) => {
      dialogCreateRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
        this.fabuttonService.showFabButton = true;
        if (result) {
          this.navbarService.showProgressbar = true;
          const templateSubTaskId = await this.firestoreService.updateTemplateSubTask(templateSubTask.id, result.fieldValue);
          this.navbarService.showProgressbar = false;
          resolve(templateSubTaskId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  deleteTemplateSubTask(templateSubTask: TemplateSubTask) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Slet opgaven",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du opgavem?",
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
        const templateSubTaskId = await this.firestoreService.deleteTemplateSubTask(templateSubTask.id);
        this.navbarService.showProgressbar = false;
      }
    });
  }
}
