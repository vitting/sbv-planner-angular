import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksEditComponent } from './tasks-edit.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [{
  path: "projects/:id/tasks/edit",
  component: TasksEditComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: true }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksEditRoutingModule { }
