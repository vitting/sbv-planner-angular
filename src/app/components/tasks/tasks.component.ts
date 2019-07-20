import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { NoDataBoxData } from '../shared/no-data-box/no-data-box.component';
import { TaskService } from 'src/app/services/task.service';

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
    private taskService: TaskService) { }

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

    this.getTasks();
  }

  ngOnDestroy(): void {
    if (this.tasksSub) {
      this.tasksSub.unsubscribe();
    }
  }

  private getTasks() {
    if (this.projectId) {
      this.tasksSub = this.taskService.getTasksOnce(this.projectId).subscribe((tasks) => {
        this.tasks = tasks;
        if (this.tasks.length === 0) {
          this.showNoData = true;
        }
      });
    }
  }

  async deleteTaskClick(task: Task) {
    const taskId = await this.taskService.deleteTask(task);
    if (taskId) {
      this.getTasks();
    }
  }

  async markAllSubTasksAsCompletedClick(task: Task) {
    const result = this.taskService.markAllSubTasksAsCompleted(task);
  }

  gotoAddTasks() {
    this.router.navigate(["/projects", this.projectId, "tasks", "edit"]);
  }
}
