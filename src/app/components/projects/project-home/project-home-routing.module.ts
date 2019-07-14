import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectHomeComponent } from './project-home.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: ProjectHomeComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectHomeRoutingModule { }
