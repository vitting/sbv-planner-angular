import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction } from '../shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  projectId: string;
  tasks$: Observable<Task[]>;
  editMode = false;
  constructor(
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.navbarService.setNavbarTitle("Opgaver");
    this.projectId = this.route.snapshot.params.projectId;

    if (this.projectId) {
      this.tasks$ = this.firestoreService.getTasks(this.projectId).pipe(take(1));
    }
  }

  deleteTaskClick(task: Task) {
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
        await this.firestoreService.deleteTask(task.id, this.projectId);
      }
    });
  }

  async markAllSubTasksAsCompletedClick(task: Task) {
    const userId = this.authService.userId;
    await this.firestoreService.markAllSubTasksAsCompleted(userId, task.id);
  }
}
