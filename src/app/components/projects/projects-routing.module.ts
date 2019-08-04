import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [{
  path: "projects/join",
  component: ProjectsComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: false, noAuthRequired: false }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
