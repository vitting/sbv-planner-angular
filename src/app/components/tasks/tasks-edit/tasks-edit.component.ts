import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ActivatedRoute } from '@angular/router';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/task.model';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TaskEditMenuComponent, TaskEditMenuResult } from './task-edit-menu/task-edit-menu.component';
import { NoDataBoxData } from '../../shared/no-data-box/no-data-box.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.scss']
})
export class TasksEditComponent implements OnInit, OnDestroy {
  projectId: string = null;
  tasks: Task[] = [];
  nodata: NoDataBoxData;
  showNoData = false;
  private taskSubscribtion: Subscription;

  constructor(
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit() {
    this.nodata = {
      textline1: "Der er endnu ikke nogen opgaver.",
      textline2: "Vær den første til at oprette en opgave."
    };

    this.navbarService.navbarTitle.next("Rediger opgaver");

    this.projectId = this.route.snapshot.params.id;

    this.getTasks();
  }

  ngOnDestroy(): void {
    if (this.taskSubscribtion) {
      this.taskSubscribtion.unsubscribe();
    }
  }

  private getTasks() {
    this.taskSubscribtion = this.taskService.getTasksOnce(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;

      if (this.tasks.length === 0) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }
    });
  }

  async drop(event: CdkDragDrop<string[]>) {
    moveItemInArray<Task>(this.tasks, event.previousIndex, event.currentIndex);
    await this.taskService.updateTasksIndex(this.tasks);
  }

  async addTask() {
    const taskId = await this.taskService.addTask(this.projectId, this.tasks.length);
    if (taskId) {
      this.getTasks();
    }
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
            break;
          default:
            console.log("OTHER");
        }
      }
    });
  }

  private async editTask(task: Task) {
    const taskId = await this.taskService.editTask(task);
    if (taskId) {
      this.getTasks();
    }
  }
}
