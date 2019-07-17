import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Summary } from 'src/app/models/summary.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TasksMenuComponent, TasksMenuResult } from '../tasks-menu/tasks-menu.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2FieldsData, Dialog2FieldsComponent, Dialog2FieldsResult } from '../../shared/dialog-2-fields/dialog-2-fields.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  @Input() editMode = false;
  summary: Summary;
  completed = false;
  private summarySub: Subscription;
  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.summarySub = this.firestoreService.getSummary(this.task.id).subscribe((summary) => {
      this.summary = summary;
      if (summary && summary.numberOfItems > 0 && summary.numberOfItems === summary.numberOfItemsCompleted) {
        this.completed = true;
      } else {
        this.completed = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.summarySub) {
      this.summarySub.unsubscribe();
    }
  }

  commentsClick() {
    this.router.navigate(["/projects", this.task.projectId, "tasks", this.task.id, "comments"]);
  }

  editTitleDescClick() {
    const data: Dialog2FieldsData = {
      title: "Rediger opgave",
      buttonText: "Gem",
      field1Label: "Titel",
      field1Value: this.task.title,
      field2Label: "Beskrivelse",
      field2Value: this.task.description
    };

    const dialogRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe((result: Dialog2FieldsResult) => {
      if (result) {
        this.firestoreService.updateTask(this.authService.userId, result.field1Value, result.field2Value, this.task);
      }
    });
  }

  menuClick() {
    const bottomSheetRef = this.bottomSheet.open(TasksMenuComponent);

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case TasksMenuResult.edit:
            // this.editTask(task);
            break;
          case TasksMenuResult.delete:
            // this.deleteTask(task);
            break;
          case TasksMenuResult.addAndRemove:
            this.editMode = !this.editMode;
            break;
          default:
            console.log("OTHER");
        }
      }
    });
  }
}
