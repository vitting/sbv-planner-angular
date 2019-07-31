import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum DialogConfirmAction {
  yes,
  no,
  ok
}

export interface DialogConfirmData {
  header: string;
  button1Text: string;
  button2Text: string;
  message1: string;
  message2: string;
  message3?: string;
  buttonOkText?: string;
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
  okButtonState = false;
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent, DialogConfirmResult>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmData) { }

  ngOnInit() {
    if (this.data && this.data.buttonOkText) {
      this.okButtonState = true;
    }
  }

  closeDialog(action: string) {
    if (this.okButtonState) {
      this.dialogRef.close({ action: DialogConfirmAction.ok });
    } else {
      if (action === "yes") {
        this.dialogRef.close({ action: DialogConfirmAction.yes });
      } else {
        this.dialogRef.close({ action: DialogConfirmAction.no });
      }
    }
  }
}
