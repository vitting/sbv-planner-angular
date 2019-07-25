import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';


const routes: Routes = [{
  path: "users/:action",
  component: UsersComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: true }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
