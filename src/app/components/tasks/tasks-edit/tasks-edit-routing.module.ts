import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksEditComponent } from './tasks-edit.component';


const routes: Routes = [{
  path: "projects/:id/tasks/edit",
  component: TasksEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksEditRoutingModule { }
