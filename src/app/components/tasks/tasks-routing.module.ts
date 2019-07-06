import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TasksEditComponent } from './tasks-edit/tasks-edit.component';

const routes: Routes = [{
  path: "projects/:id/tasks",
  component: TasksComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
