import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [{
  path: "projects/:projectId/comments", // commentType = p
  component: CommentsComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: false, noAuthRequired: false }
}, {
  path: "projects/:projectId/tasks/:taskId/comments", // commentType = t
  component: CommentsComponent,
  canActivate: [AuthGuard],
  data: { onlyAdmin: false, onlyEditor: false, noAuthRequired: false }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
