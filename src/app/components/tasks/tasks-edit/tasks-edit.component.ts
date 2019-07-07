import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2FieldsComponent, Dialog2FieldsResult, Dialog2FieldsData } from '../../shared/dialog-2-fields/dialog-2-fields.component';
import { Task, TaskItem } from 'src/app/models/task.model';
import { Dialog1FieldData, Dialog1FieldComponent, Dialog1FieldResult } from '../../shared/dialog-1-field/dialog-1-field.component';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction } from '../../shared/dialog-confirm/dialog-confirm.component';
import { SubTaskItem, SubTask } from 'src/app/models/subtask.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.scss']
})
export class TasksEditComponent implements OnInit, OnDestroy {
  projectId: string = null;
  tasks: Task[] = [];
  subTasks: Observable<SubTask[]>[] = [];
  private taskSubscribtion: Subscription;

  constructor(
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private dialog: MatDialog
  ) {
    this.navbarService.navbarTitle.next("Rediger opgaver");
    this.projectId = this.route.snapshot.params.id;

    this.taskSubscribtion = this.firestoreService.getTasks(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;
      this.subTasks = [];
      this.tasks.forEach((task) => {
        this.subTasks.push(this.firestoreService.getSubTasks(task.id));
      });
    });
  }

  ngOnInit() {}

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
        this.firestoreService.addTask(result.field1Value, result.field2Value, this.projectId, this.tasks.length);
      }
    });
  }

  addSubTask(task: TaskItem) {
    const data: Dialog1FieldData = {
      title: "Ny del opgave",
      buttonText: "Tilføj",
      fieldLabel: "Titel",
      fieldValue: null
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe((result: Dialog1FieldResult) => {
      if (result) {
        this.firestoreService.addSubTask(result.fieldValue, this.projectId, task.id);
      }
    });
  }

  deleteSubTask(subTask: SubTaskItem) {
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

  getSubTasks(taskId: string) {
    console.log("GETSUBTASKS");
    return this.firestoreService.getSubTasks(taskId);
  }
}
