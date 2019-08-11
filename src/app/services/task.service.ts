import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { take } from 'rxjs/operators';
import { Task } from '../models/task.model';
import {
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../components/shared/dialog-confirm/dialog-confirm.component';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  Dialog2FieldsComponent,
  Dialog2FieldsResult
} from '../components/shared/dialog-2-fields/dialog-2-fields.component';
import {
  Dialog1FieldComponent,
  Dialog1FieldResult
} from '../components/shared/dialog-1-field/dialog-1-field.component';
import { SubTask } from '../models/subtask.model';
import { NavbarService } from './navbar.service';
import { FabButtonService } from './fab-button.service';
import { DialogUtilityService } from './dialog-utility.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private navbarService: NavbarService,
    private fabButtonService: FabButtonService,
    private dialogUtility: DialogUtilityService,
    private dialog: MatDialog) { }

  updateCommentsLastRead(taskId: string) {
    return this.firestoreService.updateUserMetaComments(this.authService.userId, taskId);
  }

  getTasksOnce(projectId: string) {
    return this.firestoreService.getTasks(projectId).pipe(take(1));
  }

  getTaskSummary(taskId: string) {
    return this.firestoreService.getSummary(taskId);
  }

  async getTasksByTaskIds(taskIds: string[]) {
    const tasks: Task[] = [];

    for (const taskId of taskIds) {
      const project = await this.firestoreService.getTask(taskId);
      tasks.push(project);
    }

    return tasks;
  }

  updateTasksIndex(tasks: Task[]) {
    return this.firestoreService.updateTasksIndex(tasks);
  }

  async addTask(projectId: string, taskIndex: number) {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: this.dialogUtility.getDialog2FieldsData("Ny opgave gruppe", "Tilføj", "Titel", "Beskrivelse")
    });

    const result = await dialogRef.afterClosed().toPromise<Dialog2FieldsResult>();
    let taskId = null;
    this.fabButtonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      taskId = await this.firestoreService.addTask(
        this.authService.userId,
        result.field1Value,
        result.field2Value,
        projectId,
        taskIndex);
      this.navbarService.showProgressbar = false;

    }

    return Promise.resolve(taskId);
  }

  async editTask(task: Task) {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: this.dialogUtility.getDialog2FieldsData("Rediger opgave gruppen", "Gem", "Titel", "Beskrivelse", task.title, task.description)
    });

    const result = await dialogRef.afterClosed().toPromise<Dialog2FieldsResult>();
    let taskId = null;
    this.fabButtonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      taskId = await this.firestoreService.updateTask(this.authService.userId, result.field1Value, result.field2Value, task);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(taskId);
  }

  async deleteTask(task: Task) {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData(
        "Slet opgave gruppen",
        "Vil du slette opgave gruppen?",
        "Gruppen og alle opgaver bliver slettet!")
    });

    const result = await dialogRef.afterClosed().toPromise<DialogConfirmResult>();
    let taskId = null;
    this.fabButtonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      taskId = await this.firestoreService.deleteTask(task.id);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(result);
  }

  async markAllSubTasksAsCompleted(task: Task): Promise<string> {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData("Opgaver", "Er du sikker på du vil markere alle opgaver som udført?")
    });

    const result = await dialogRef.afterClosed().toPromise<DialogConfirmResult>();
    let taskId = null;
    this.fabButtonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      taskId = await this.firestoreService.markAllSubTasks(this.authService.userId, task.id, true);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(taskId);
  }

  async markAllSubTasksAsNotCompleted(task: Task): Promise<string> {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData("Opgaver", "Er du sikker på du vil markere alle opgaver som ikke udført?")
    });

    const result = await dialogRef.afterClosed().toPromise<DialogConfirmResult>();
    let taskId = null;
    this.fabButtonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      taskId = await this.firestoreService.markAllSubTasks(this.authService.userId, task.id, false);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(taskId);
  }

  getSubTasks(taskId: string) {
    return this.firestoreService.getSubTasks(taskId);
  }

  async addSubTask(task: Task): Promise<string> {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data: this.dialogUtility.getDialog1FieldData("Ny opgave", "Tilføj", "Titel")
    });

    const result = await dialogRef.afterClosed().toPromise<Dialog1FieldResult>();
    let subTaskId = null;
    this.fabButtonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      subTaskId = this.firestoreService.addSubTask(this.authService.userId, result.fieldValue, task.projectId, task.id);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(subTaskId);
  }

  async editSubTask(subTask: SubTask) {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: false,
      data: this.dialogUtility.getDialog1FieldData("Rediger opgaven", "Gem", "Titel", subTask.title)
    });

    const result = await dialogRef.afterClosed().toPromise<Dialog1FieldResult>();
    let subTaskId = null;
    this.fabButtonService.showFabButton = true;
    if (result && result.fieldValue.trim()) {
      this.navbarService.showProgressbar = true;
      subTaskId = this.firestoreService.updateSubTask(this.authService.userId, result.fieldValue, subTask);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(subTaskId);
  }

  async deleteSubTask(subTask: SubTask) {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData("Slet opgaven", "Vil du slette opgaven?", subTask.title)
    });

    const result = await dialogRef.afterClosed().toPromise<DialogConfirmResult>();
    let subTaskId = null;
    this.fabButtonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      subTaskId = await this.firestoreService.deleteSubTask(subTask);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(subTaskId);
  }

  updateSubTaskCompleteStatus(subTaskId: string, completed: boolean) {
    return this.firestoreService.updateSubTaskCompleteStatus(subTaskId, this.authService.userId, completed);
  }

  addUserToSubTask(subTaskId: string): Promise<string> {
    return this.firestoreService.addUserToSubTask(subTaskId, this.authService.userId);
  }

  async removeUserFromSubTask(subTaskId: string, userId: string) {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData("Fjern fra opgaven", "Vil du fjerne dig fra opgaven?")
    });

    const result = await dialogRef.afterClosed().toPromise<DialogConfirmResult>();
    let resultId = null;
    this.fabButtonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      resultId = await this.firestoreService.removeUserFromSubTask(subTaskId, userId);
    }

    return Promise.resolve(resultId);
  }
}
