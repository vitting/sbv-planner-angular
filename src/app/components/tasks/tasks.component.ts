import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TasksMenuComponent, TasksMenuResult } from './tasks-menu/tasks-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2FieldsData, Dialog2FieldsComponent, Dialog2FieldsResult } from '../shared/dialog-2-fields/dialog-2-fields.component';
import { AuthService } from 'src/app/services/auth.service';
import { tap, shareReplay, takeLast, publishReplay, refCount, take } from 'rxjs/operators';
import { DialogConfirmData, DialogConfirmComponent, DialogConfirmResult, DialogConfirmAction } from '../shared/dialog-confirm/dialog-confirm.component';

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
    private router: Router,
    private navbarService: NavbarService,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
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
}
