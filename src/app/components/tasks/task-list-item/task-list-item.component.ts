import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Summary } from 'src/app/models/summary.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TasksMenuComponent, TasksMenuResult } from '../tasks-menu/tasks-menu.component';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  @Input() editMode = false;
  @Output() deleteTaskClick = new EventEmitter<Task>();
  @Output() markAllSubTasksAsCompletedClick = new EventEmitter<Task>();
  summary: Summary;
  completed = false;
  private summarySub: Subscription;
  constructor(
    private firestoreService: FirestoreService,
    private taskService: TaskService,
    private router: Router,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.getSummary();
  }

  ngOnDestroy(): void {
    if (this.summarySub) {
      this.summarySub.unsubscribe();
    }
  }

  getSummary() {
    this.summarySub = this.taskService.getTaskSummary(this.task.id).subscribe((summary) => {
      this.summary = summary;
      if (summary && summary.numberOfItems > 0 && summary.numberOfItems === summary.numberOfItemsCompleted) {
        this.completed = true;
      } else {
        this.completed = false;
      }
    });
  }

  commentsClick() {
    this.router.navigate(["/projects", this.task.projectId, "tasks", this.task.id, "comments"]);
  }

  async editTitleDescClick() {
    const taskId = await this.taskService.editTask(this.task);
    if (taskId) {
      this.task = await this.firestoreService.getTask(this.task.id);
    }
  }

  menuClick() {
    const bottomSheetRef = this.bottomSheet.open(TasksMenuComponent, {
      data: {
        inEditMode: this.editMode,
        taskCompleted: this.completed
      }
    });

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case TasksMenuResult.delete:
            this.deleteTaskClick.emit(this.task);
            break;
          case TasksMenuResult.addAndRemove:
            this.editMode = !this.editMode;
            break;
          case TasksMenuResult.markAllSubTasksCompleted:
            this.markAllSubTasksAsCompletedClick.emit(this.task);
            break;
          default:
            console.log("OTHER");
        }
      }
    });
  }
}
