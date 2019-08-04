import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [{
  path: "login",
  component: LoginComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: false, noAuthRequired: true }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
