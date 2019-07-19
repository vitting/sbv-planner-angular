import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction } from '../shared/dialog-confirm/dialog-confirm.component';
import { NoDataBoxData } from '../shared/no-data-box/no-data-box.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  projectId: string;
  tasks$: Observable<Task[]>;
  tasks: Task[] = [];
  tasksSub: Subscription;
  editMode = false;
  nodata: NoDataBoxData;
  showNoData = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navbarService: NavbarService,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.navbarService.setNavbarTitle({
      title: "Opgaver",
      icon: {
        collection: "fas",
        icon: "tasks"
      }
    });

    this.nodata = {
      textline1: "Der er endnu ikke nogen opgaver.",
      textline2: "Vær den første til at oprette en opgave."
    };

    this.projectId = this.route.snapshot.params.projectId;

    if (this.projectId) {
      this.tasksSub = this.firestoreService.getTasks(this.projectId).pipe(take(1)).subscribe((tasks) => {
        this.tasks = tasks;
        if (this.tasks.length === 0) {
          this.showNoData = true;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.tasksSub) {
      this.tasksSub.unsubscribe();
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

  markAllSubTasksAsCompletedClick(task: Task) {
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

    dialogRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      if (result && result.action === DialogConfirmAction.yes) {
        const userId = this.authService.userId;
        await this.firestoreService.markAllSubTasksAsCompleted(userId, task.id);
      }
    });
  }

  gotoAddTasks() {
    this.router.navigate(["/projects", this.projectId, "tasks", "edit"]);
  }
}
