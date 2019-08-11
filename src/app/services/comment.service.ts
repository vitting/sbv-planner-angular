import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Dialog1FieldComponent, Dialog1FieldResult } from '../components/shared/dialog-1-field/dialog-1-field.component';
import { Comment } from '../models/comment.model';
import {
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../components/shared/dialog-confirm/dialog-confirm.component';
import { NavbarService } from './navbar.service';
import { FabButtonService } from './fab-button.service';
import { DialogUtilityService } from './dialog-utility.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private navbarService: NavbarService,
    private fabButtonService: FabButtonService,
    private dialogUtility: DialogUtilityService,
    private dialog: MatDialog) { }

  getComments(parentId: string) {
    return this.firestoreService.getComments(parentId);
  }

  async addComment(parentId: string, commentType: string): Promise<string> {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data: this.dialogUtility.getDialog1FieldData("Ny kommentar", "Tilføj", "Skriv kommentar", null, 3)
    });

    const result = await dialogRef.afterClosed().toPromise<Dialog1FieldResult>();
    let commentId = null;
    this.fabButtonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      commentId = await this.firestoreService.addComment(
        this.authService.authUserInfo,
        result.fieldValue,
        commentType,
        parentId
      );
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(commentId);
  }

  async editComment(comment: Comment): Promise<string> {
    this.fabButtonService.showFabButton = false;
    const dialogRef = this.dialog.open(Dialog1FieldComponent, {
      width: '350px',
      autoFocus: true,
      data: this.dialogUtility.getDialog1FieldData("Rediger kommentar", "Opdater", "Kommentar", comment.text, 3)
    });

    const result = await dialogRef.afterClosed().toPromise<Dialog1FieldResult>();
    let commentId = null;
    this.fabButtonService.showFabButton = true;
    if (result) {
      this.navbarService.showProgressbar = true;
      commentId = await this.firestoreService.updateComment(comment.id, result.fieldValue);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(commentId);
  }

  async deleteComment(comment: Comment): Promise<string> {
    this.fabButtonService.showFabButton = false;
    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: this.dialogUtility.getDialogConfirmData("Slet kommentar", "Vil du slette din kommentar?")
    });

    const result = await dialogConfirmRef.afterClosed().toPromise<DialogConfirmResult>();
    let commentId = null;
    this.fabButtonService.showFabButton = true;
    if (result && result.action === DialogConfirmAction.yes) {
      this.navbarService.showProgressbar = true;
      commentId = await this.firestoreService.deleteComment(comment.id);
      this.navbarService.showProgressbar = false;
    }

    return Promise.resolve(commentId);
  }
}
