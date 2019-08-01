import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectEditComponent } from './project-edit.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [{
  path: "projects",
  component: ProjectEditComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: true }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectEditRoutingModule { }
