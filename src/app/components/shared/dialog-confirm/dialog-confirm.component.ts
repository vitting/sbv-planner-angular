import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum DialogConfirmAction {
  yes,
  no
}

export interface DialogConfirmData {
  header: string;
  button1Text: string;
  button2Text: string;
  message1: string;
  message2: string;
  message3?: string;
}

export interface DialogConfirmResult {
  action: DialogConfirmAction;
}

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent, DialogConfirmResult>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmData) { }

  ngOnInit() {
  }

  closeDialog(action: string) {
    if (action === "yes") {
      this.dialogRef.close({ action: DialogConfirmAction.yes });
    } else {
      this.dialogRef.close({ action: DialogConfirmAction.no });
    }
  }
}
