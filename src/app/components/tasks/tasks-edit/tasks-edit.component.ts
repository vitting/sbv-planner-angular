import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2FieldsComponent, Dialog2FieldsResult, Dialog2FieldsData } from '../../shared/dialog-2-fields/dialog-2-fields.component';
import { Task } from 'src/app/models/task.model';
import { SubTask } from 'src/app/models/subtask.model';
import { Subscription, Observable, forkJoin, zip } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TaskEditMenuComponent, TaskEditMenuResult } from './task-edit-menu/task-edit-menu.component';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../../shared/dialog-confirm/dialog-confirm.component';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.scss']
})
export class TasksEditComponent implements OnInit, OnDestroy {
  projectId: string = null;
  tasks: Task[] = [];
  // subTasks: Observable<SubTask[]>[] = [];
  private taskSubscribtion: Subscription;

  constructor(
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {
    this.navbarService.navbarTitle.next("Rediger opgaver");
    this.projectId = this.route.snapshot.params.id;

    this.taskSubscribtion = this.firestoreService.getTasks(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit() { }

  async drop(event: CdkDragDrop<string[]>) {
    moveItemInArray<Task>(this.tasks, event.previousIndex, event.currentIndex);
    await this.firestoreService.updateTasksIndex(this.tasks);
  }

  ngOnDestroy(): void {
    this.taskSubscribtion.unsubscribe();
  }

  addTask() {
    const data: Dialog2FieldsData = {
      title: "Ny opgave",
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

    dialogRef.afterClosed().subscribe((result: Dialog2FieldsResult) => {
      if (result) {
        this.firestoreService.addTask(this.authService.userId, result.field1Value, result.field2Value, this.projectId, this.tasks.length);
      }
    });
  }

  menuTask(task: Task) {
    const bottomSheetRef = this.bottomSheet.open(TaskEditMenuComponent);

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case TaskEditMenuResult.edit:
            this.editTask(task);
            break;
          case TaskEditMenuResult.delete:
            this.deleteTask(task);
            break;
          default:
            console.log("OTHER");
        }
      }
    });
  }

  private editTask(task: Task) {
    const data: Dialog2FieldsData = {
      title: "Rediger opgave",
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

    dialogRef.afterClosed().subscribe((result: Dialog2FieldsResult) => {
      if (result) {
        this.firestoreService.editTask(this.authService.userId, result.field1Value, result.field2Value, task);
      }
    });
  }

  private deleteTask(task: Task) {
    const data: DialogConfirmData = {
      header: "Slet opgaven",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du slette opgaven?",
      message2: task.title
    };

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      if (result && result.action === DialogConfirmAction.yes) {
        await this.firestoreService.deleteTask(task.id);
      }
    });
  }
}
