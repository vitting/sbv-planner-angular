import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments.component';


const routes: Routes = [{
  path: "comments/:commentType",
  component: CommentsComponent
}, {
  path: "projects/:projectId/comments/:commentType", // commentType = p
  component: CommentsComponent
}, {
  path: "projects/:projectId/taskts/:taskId/comments/:commentType", // commentType = t
  component: CommentsComponent
}, {
  path: "projects/:projectId/taskts/:taskId/subtasks/:subtaskId/comments/:commentType", // commentType = s
  component: CommentsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
