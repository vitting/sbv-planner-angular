import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [{
  path: "projects/:projectId/comments", // commentType = p
  component: CommentsComponent
}, {
  path: "projects/:projectId/tasks/:taskId/comments", // commentType = t
  component: CommentsComponent,
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
