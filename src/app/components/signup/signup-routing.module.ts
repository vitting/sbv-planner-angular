import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SignupMessageComponent } from './signup-message/signup-message.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [{
  path: "signup",
  component: SignupComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: false, noAuthRequired: true }
}, {
  path: "message",
  component: SignupMessageComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: false, noAuthRequired: true }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
