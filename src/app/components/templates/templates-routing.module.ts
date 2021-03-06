import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [{
  path: "templates",
  component: TemplatesComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: true, noAuthRequired: false }
}, {
  path: "templates/:action",
  component: TemplatesComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: false, noAuthRequired: false }
}, {
  path: "templates/:templateId/:action",
  component: TemplatesComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: true, noAuthRequired: false }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
