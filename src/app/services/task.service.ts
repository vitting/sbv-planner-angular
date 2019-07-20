import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { take } from 'rxjs/operators';
import { Task } from '../models/task.model';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction } from '../components/shared/dialog-confirm/dialog-confirm.component';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  Dialog2FieldsData,
  Dialog2FieldsComponent,
  Dialog2FieldsResult } from '../components/shared/dialog-2-fields/dialog-2-fields.component';
import { Dialog1FieldData, Dialog1FieldComponent, Dialog1FieldResult } from '../components/shared/dialog-1-field/dialog-1-field.component';
import { SubTask } from '../models/subtask.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestoreService: FirestoreService, private authService: AuthService, private dialog: MatDialog) { }

  getTasksOnce(projectId: string) {
    return this.firestoreService.getTasks(projectId).pipe(take(1));
  }

  getTaskSummary(taskId: string) {
    return this.firestoreService.getSummary(taskId);
  }

  updateTasksIndex(tasks: Task[]) {
    return this.firestoreService.updateTasksIndex(tasks);
  }

  addTask(projectId: string, taskIndex: number) {
    const data: Dialog2FieldsData = {
      title: "Ny opgave gruppe",
      buttonText: "Tilføj",
      field1Label: "Titel",
      field1Value: null,
      field2Label: "Beskrivelse",
      field2Value: null
    };

    const dialogRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        if (result) {
          const taskId = await this.firestoreService.addTask(
            this.authService.userId,
            result.field1Value,
            result.field2Value,
            projectId,
            taskIndex);

          resolve(taskId);
        } else {
          resolve(null);
        }
      });
    });
  }

  editTask(task: Task) {
    const data: Dialog2FieldsData = {
      title: "Rediger opgave gruppen",
      buttonText: "Gem",
      field1Label: "Titel",
      field1Value: task.title,
      field2Label: "Beskrivelse",
      field2Value: task.description
    };

    const dialogRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
        if (result) {
          const taskId = await this.firestoreService.updateTask(this.authService.userId, result.field1Value, result.field2Value, task);
          resolve(taskId);
        } else {
          resolve(null);
        }
      });
    });
  }

  deleteTask(task: Task) {
    const data: DialogConfirmData = {
      header: "Slet opgave gruppen",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du slette opgave gruppen?",
      message2: "Gruppen og alle opgaver bliver slettet!"
    };

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
        if (result && result.action === DialogConfirmAction.yes) {
          resolve(await this.firestoreService.deleteTask(task.id, task.projectId));
        } else {
          resolve(null);
        }
      });
    });
  }

  markAllSubTasksAsCompleted(task: Task): Promise<string> {
    const data: DialogConfirmData = {
      header: "Opgaver",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Er du sikker på du vil markere alle opgaver som udført?",
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
          const taskId = await this.firestoreService.markAllSubTasksAsCompleted(this.authService.userId, task.id);
          resolve(taskId);
        } else {
          resolve(null);
        }
      });
    });
  }

  getSubTasks(taskId: string) {
    return this.firestoreService.getSubTasks(taskId);
  }

  addSubTask(task: Task): Promise<string> {
    const data: Dialog1FieldData = {
      title: "Ny opgave",
      buttonText: "Tilføj",
      fieldLabel: "Titel",
      fieldValue: null,
      multiLine: 0
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe((result: Dialog1FieldResult) => {
        if (result) {
          const subTaskId = this.firestoreService.addSubTask(this.authService.userId, result.fieldValue, task.projectId, task.id);
          resolve(subTaskId);
        } else {
          resolve(null);
        }
      });
    });
  }

  editSubTask(subTask: SubTask) {
    const data: Dialog1FieldData = {
      title: "Rediger opgaven",
      buttonText: "Gem",
      fieldLabel: "Titel",
      fieldValue: subTask.title,
      multiLine: 0
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: false,
      data
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe((result: Dialog1FieldResult) => {
        if (result && result.fieldValue.trim()) {
          const subTaskId = this.firestoreService.updateSubTask(this.authService.userId, result.fieldValue, subTask);
          resolve(subTaskId);
        } else {
          resolve(null);
        }
      });
    });
  }

  deleteSubTask(subTask: SubTask) {
    const data: DialogConfirmData = {
      header: "Slet opgaven",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du slette opgaven?",
      message2: subTask.title
    };

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
        if (result && result.action === DialogConfirmAction.yes) {
          const subTaskId = await this.firestoreService.deleteSubTask(subTask);
          resolve(subTaskId);
        } else {
          resolve(null);
        }
      });
    });
  }

  updateSubTaskCompleteStatus(taskId: string, subTaskId: string, completed: boolean) {
    return this.firestoreService.updateSubTaskCompleteStatus(subTaskId, this.authService.userId, completed, taskId);
  }

  addUserToSubTask(subTaskId: string): Promise<string> {
    return this.firestoreService.addPersonToSubTask(subTaskId, this.authService.userId);
  }

  removeUserFromSubTask(subTaskId: string, userId: string) {
    const data: DialogConfirmData = {
      header: "Fjern fra opgaven",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du fjerne dig fra opgaven?",
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
          const resultId = await this.firestoreService.removePersonFromSubTask(subTaskId, userId);
          resolve(resultId);
        } else {
          resolve(null);
        }
      });
    });
  }
}
