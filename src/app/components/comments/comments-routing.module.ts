import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments.component';


const routes: Routes = [{
  path: "projects/:projectId/comments", // commentType = p
  component: CommentsComponent
}, {
  path: "projects/:projectId/tasks/:taskId/comments", // commentType = t
  component: CommentsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
