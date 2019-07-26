import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YearCalendarComponent } from './year-calendar.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';


const routes: Routes = [{
  path: "calendar",
  component: YearCalendarComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YearCalendarRoutingModule { }
