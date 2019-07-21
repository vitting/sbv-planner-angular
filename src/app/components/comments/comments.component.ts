import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService, ProjectTaskName } from 'src/app/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { Comment } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CommentItemMenuComponent, CommentItemMenuResult } from './comment-item-menu/comment-item-menu.component';
import { ActivatedRoute } from '@angular/router';
import { NoDataBoxData } from '../shared/no-data-box/no-data-box.component';
import { tap } from 'rxjs/operators';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments$: Observable<Comment[]>;
  nodata: NoDataBoxData;
  showNoData = false;
  private parentId: string;
  private commentType: string;
  private projectId: string;
  private taskId: string;
  constructor(
    private navbarService: NavbarService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.nodata = {
      textline1: "Der er endnu ikke nogen kommentarere.",
      textline2: "Vær den første til at skrive en kommentar."
    };

    this.parentId = this.getParetId();
    this.setTitle();
    this.getComments();
  }

  private getComments() {
    this.comments$ = this.commentService.getComments(this.parentId).pipe(tap((tasks) => {
      this.showNoData = tasks.length === 0;
    }));
  }

  private setTitle() {
    if (this.commentType === "task") {
      this.navbarService.navbarTitle.next("Opgave kommentar");
    } else {
      this.navbarService.navbarTitle.next("Projekt kommentar");
    }
  }

  private getParetId(): string {
    this.projectId = this.route.snapshot.params.projectId;
    this.taskId = this.route.snapshot.params.taskId;
    this.commentType = this.taskId ? "task" : "project";
    return this.taskId ? this.taskId : this.projectId;
  }

  private async editComment(comment: Comment) {
    const result = this.commentService.editComment(comment);
  }

  private async deleteComment(comment: Comment) {
    const result = this.commentService.deleteComment(comment);
  }

  async addComment() {
    const result = this.commentService.addComment(this.parentId, this.commentType);
  }

  menuItemClicked(comment: Comment) {
    const bottomSheetRef = this.bottomSheet.open(CommentItemMenuComponent);

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case CommentItemMenuResult.edit:
            this.editComment(comment);
            break;
          case CommentItemMenuResult.delete:
            this.deleteComment(comment);
            break;
          default:
            console.log("OTHER");
        }
      }
    });
  }
}
