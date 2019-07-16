import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Summary } from 'src/app/models/summary.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TasksMenuComponent, TasksMenuResult } from '../tasks-menu/tasks-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  @Input() editMode = false;
  // @Output() commentsClick = new EventEmitter<Task>();
  // @Output() menuClick = new EventEmitter<Task>();
  summary: Summary;
  completed = false;
  private summarySub: Subscription;
  constructor(private firestoreService: FirestoreService, private router: Router, private bottomSheet: MatBottomSheet) { }

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

  goToComments() {
    this.router.navigate(["/projects", this.task.projectId, "tasks", this.task.id, "comments"]);
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
