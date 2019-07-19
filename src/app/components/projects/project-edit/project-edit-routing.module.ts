import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectEditComponent } from './project-edit.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [{
  path: "projects/edit",
  component: ProjectEditComponent,
  canActivate: [AngularFireAuthGuard],
data: { authGuardPipe: redirectUnauthorizedToLogin }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectEditRoutingModule { }
