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

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.scss']
})
export class SubtaskListComponent implements OnInit {
  @Input() task: Task;
  @Input() showButton = false;
  subtasks$: Observable<SubTask[]>;
  constructor(private firestoreService: FirestoreService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    if (this.task) {
      this.subtasks$ = this.firestoreService.getSubTasks(this.task.id);
    }
  }

  addSubTask(task: Task) {
    const data: Dialog1FieldData = {
      title: "Ny del opgave",
      buttonText: "Tilføj",
      fieldLabel: "Titel",
      fieldValue: null
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
      fieldValue: subTask.title
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe((result: Dialog1FieldResult) => {
      if (result && result.fieldValue.trim()) {
        this.firestoreService.editSubTask(this.authService.userId, result.fieldValue, subTask);
      }
    });
  }

  deleteSubTask(subTask: SubTask) {
    const data: DialogConfirmData = {
      header: "Slet del opgave",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du slette del opgaven?",
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
        this.firestoreService.deleteSubTask(subTask.id);
      }
    });
  }
}
