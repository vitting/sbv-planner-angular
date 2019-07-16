import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SubTask } from 'src/app/models/subtask.model';
import { Subscription, Observable } from 'rxjs';
import { Dialog1FieldData, Dialog1FieldComponent, Dialog1FieldResult } from '../../shared/dialog-1-field/dialog-1-field.component';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction,
  DialogConfirmData
} from '../../shared/dialog-confirm/dialog-confirm.component';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { SubTaskCheckboxStateInfo, SubTaskPerson } from './subtask-list-item/subtask-list-item.component';

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.scss']
})
export class SubtaskListComponent implements OnInit {
  @Input() task: Task;
  @Input() showButton = false;
  @Input() edit = true;
  subtasks$: Observable<SubTask[]>;
  constructor(private firestoreService: FirestoreService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    if (this.task) {
      this.subtasks$ = this.firestoreService.getSubTasks(this.task.id);
    }
  }

  // TODO: Can we switch TO Edit mode for a single task

  addSubTask(task: Task) {
    const data: Dialog1FieldData = {
      title: "Ny del opgave",
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

    dialogRef.afterClosed().subscribe((result: Dialog1FieldResult) => {
      if (result) {
        this.firestoreService.addSubTask(this.authService.userId, result.fieldValue, this.task.projectId, task.id);
      }
    });
  }

  editSubTask(subTask: SubTask) {
    const data: Dialog1FieldData = {
      title: "Rediger del opgave",
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

    dialogRef.afterClosed().subscribe((result: Dialog1FieldResult) => {
      if (result && result.fieldValue.trim()) {
        this.firestoreService.updateSubTask(this.authService.userId, result.fieldValue, subTask);
      }
    });
  }

  deleteSubTask(subTask: SubTask) {
    const data: DialogConfirmData = {
      header: "Slet opgave",
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

    dialogRef.afterClosed().subscribe((result: DialogConfirmResult) => {
      if (result && result.action === DialogConfirmAction.yes) {
        console.log(result);
        this.firestoreService.deleteSubTask(subTask.id, this.task.id);
      }
    });
  }

  async addPerson(subTask: SubTask) {
    const userId = this.authService.userId;
    const subTaskId = await this.firestoreService.addPersonToSubTask(subTask.id, userId);
    console.log(subTaskId);
  }

  async removePerson(subTaskPerson: SubTaskPerson) {
    const data: DialogConfirmData = {
      header: "Fjern fra opgave",
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

    dialogRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      if (result && result.action === DialogConfirmAction.yes) {
        const subTaskId = await this.firestoreService.removePersonFromSubTask(subTaskPerson.subTask.id, subTaskPerson.user.id);
      }
    });
  }

  async checkboxClicked(status: SubTaskCheckboxStateInfo) {
    const userId = this.authService.userId;
    const subTaskId = await this.firestoreService.updateSubTaskCompleteStatus(status.subTask.id, userId, status.completed, this.task.id);
    console.log(subTaskId);
  }
}
