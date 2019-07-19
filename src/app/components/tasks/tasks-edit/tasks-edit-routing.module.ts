import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksEditComponent } from './tasks-edit.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [{
  path: "projects/:id/tasks/edit",
  component: TasksEditComponent,
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksEditRoutingModule { }
