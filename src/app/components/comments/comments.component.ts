import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Dialog1FieldData, Dialog1FieldComponent, Dialog1FieldResult } from '../shared/dialog-1-field/dialog-1-field.component';
import { MatDialog } from '@angular/material/dialog';
import { CommentItem, Comment } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CommentItemMenuComponent, CommentItemMenuResult } from './comment-item-menu/comment-item-menu.component';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../shared/dialog-confirm/dialog-confirm.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments$: Observable<Comment[]>;
  private parentId: string;
  private commentType: string;
  constructor(
    private authService: AuthService,
    private navbarService: NavbarService,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Kommentar");
    this.commentType = this.route.snapshot.params.commentType;
    this.parentId = this.getParetId();
    this.comments$ = this.firestoreService.getComments(this.parentId, this.commentType);
  }

  getParetId(): string {
    let id: string = null;
    const projectId = this.route.snapshot.params.projectId;
    const taskId = this.route.snapshot.params.taskId;
    const subTaskId = this.route.snapshot.params.subtaskId;

    switch (this.commentType) {
      case "p":
        id = "erwerwer";
        // id = projectId;
        break;
      case "t":
        id = taskId;
        break;
      case "s":
        id = subTaskId;
        break;
      default:
        console.log("Comment", "Missiong CommentType");
    }
    return id;
  }

  addComment() {
    const data: Dialog1FieldData = {
      title: "Ny kommentar",
      buttonText: "Tilføj",
      fieldLabel: "Skriv kommentar",
      fieldValue: null,
      multiLine: 3
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data
    });

    dialogRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
      if (result) {
        console.log(result);
        const commentId = await this.firestoreService.addComment(
          this.authService.authUserInfo,
          result.fieldValue,
          this.commentType,
          this.parentId
        );
      }
    });
  }

  editComment(comment: Comment) {
    const data: Dialog1FieldData = {
      title: "Rediger kommentar",
      buttonText: "Opdater",
      fieldLabel: "Kommentar",
      fieldValue: comment.text,
      multiLine: 3
    };

    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data
    });

    dialogRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
      if (result) {
        console.log(result);
        const commentId = await this.firestoreService.updateComment(this.authService.userId, comment.id, result.fieldValue);
      }
    });
  }

  deleteComment(comment: Comment) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Slet kommentar",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du slette din kommentar?",
      message2: comment.text
    };

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      if (result && result.action === DialogConfirmAction.yes) {
        await this.firestoreService.deleteComment(comment.id);
      }
    });
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
