import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Dialog1FieldData, Dialog1FieldComponent, Dialog1FieldResult } from '../components/shared/dialog-1-field/dialog-1-field.component';
import { Comment } from '../models/comment.model';
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction } from '../components/shared/dialog-confirm/dialog-confirm.component';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private navbarService: NavbarService,
    private dialog: MatDialog) { }

  getComments(parentId: string) {
    return this.firestoreService.getComments(parentId);
  }

  addComment(parentId: string, commentType: string): Promise<string> {
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

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
        if (result) {
          this.navbarService.showProgressbar = true;
          const commentId = await this.firestoreService.addComment(
            this.authService.authUserInfo,
            result.fieldValue,
            commentType,
            parentId
          );
          this.navbarService.showProgressbar = false;
          resolve(commentId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  editComment(comment: Comment): Promise<string> {
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

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(async (result: Dialog1FieldResult) => {
        if (result) {
          this.navbarService.showProgressbar = true;
          const commentId = await this.firestoreService.updateComment(comment.id, result.fieldValue);
          this.navbarService.showProgressbar = false;
          resolve(commentId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }

  deleteComment(comment: Comment): Promise<string> {
    const dialogConfirmData: DialogConfirmData = {
      header: "Slet kommentar",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du slette din kommentar?",
      message2: null
    };

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    return new Promise((resolve, reject) => {
      dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
        if (result && result.action === DialogConfirmAction.yes) {
          this.navbarService.showProgressbar = true;
          const commentId = await this.firestoreService.deleteComment(comment.id, comment.parentId);
          this.navbarService.showProgressbar = false;
          resolve(commentId);
        } else {
          this.navbarService.showProgressbar = false;
          resolve(null);
        }
      });
    });
  }
}
