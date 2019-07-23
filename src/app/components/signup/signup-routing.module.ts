import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SignupMessageComponent } from './signup-message/signup-message.component';

const routes: Routes = [{
  path: "signup",
  component: SignupComponent
}, {
  path: "message",
  component: SignupMessageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
