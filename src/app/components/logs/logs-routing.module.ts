import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsComponent } from './logs.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';


const routes: Routes = [{
  path: "logs",
  component: LogsComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: true, onlyEditor: false, noAuthRequired: false }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
