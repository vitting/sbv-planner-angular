import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TasksMenuComponent, TasksMenuResult } from './tasks-menu/tasks-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2FieldsData, Dialog2FieldsComponent, Dialog2FieldsResult } from '../shared/dialog-2-fields/dialog-2-fields.component';
import { AuthService } from 'src/app/services/auth.service';

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
      this.tasks$ = this.firestoreService.getTasks(this.projectId);
    }
  }
}
