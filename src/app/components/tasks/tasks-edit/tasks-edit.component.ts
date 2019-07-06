import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2FieldsComponent, Dialog2FieldsResult, Dialog2FieldsData } from '../../shared/dialog-2-fields/dialog-2-fields.component';
import { Task } from 'src/app/models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.scss']
})
export class TasksEditComponent implements OnInit {
  projectId: string = null;
  tasks: Task[];
  constructor(
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    public dialog: MatDialog
  ) {
    this.navbarService.navbarTitle.next("Rediger opgaver");
    this.projectId = this.route.snapshot.params.id;
    this.firestoreService.getTasks(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit() {

  }

  async drop(event: CdkDragDrop<string[]>) {
    moveItemInArray<Task>(this.tasks, event.previousIndex, event.currentIndex);
    await this.firestoreService.updateTasksIndex(this.tasks);
  }

  addTask() {
    const data: Dialog2FieldsData = {
      title: "Ny opgave",
      buttonText: "Tilføj",
      field1Label: "Opgave titel",
      field1Value: null,
      field2Label: "Opgave beskrivelse",
      field2Value: null
    };
    const dialogRef = this.dialog.open(Dialog2FieldsComponent, {
      width: '350px',
      data
    });

    dialogRef.afterClosed().subscribe((result: Dialog2FieldsResult) => {
      this.firestoreService.addTask(result.field1Value, result.field2Value, this.projectId, this.tasks.length);
    });
  }
}
