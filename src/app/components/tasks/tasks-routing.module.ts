import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
const routes: Routes = [{
  path: "projects/:projectId/tasks",
  component: TasksComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
