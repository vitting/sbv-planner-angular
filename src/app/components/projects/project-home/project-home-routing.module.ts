import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectHomeComponent } from './project-home.component';
import { redirectUnauthorizedTo, AngularFireAuthGuard } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [{
  path: '',
  component: ProjectHomeComponent,
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectHomeRoutingModule { }
