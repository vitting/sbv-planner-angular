import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

export interface Dialog1FieldData {
  title: string;
  buttonText: string;
  fieldLabel: string;
  fieldValue: string;
  multiLine: number;
}

export interface Dialog1FieldResult {
  fieldValue: string;
}

@Component({
  selector: 'app-dialog-1-field',
  templateUrl: './dialog-1-field.component.html',
  styleUrls: ['./dialog-1-field.component.scss']
})
export class Dialog1FieldComponent implements OnInit {
  title = "";
  buttonText = "";
  fieldForm: FormGroup;
  showMultiLine = false;
  numberOfLines = 3;
  constructor(
    public dialogRef: MatDialogRef<Dialog1FieldComponent, Dialog1FieldResult>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog1FieldData) { }

  ngOnInit() {
    this.title = this.data.title;
    this.buttonText = this.data.buttonText;
    if (this.data.multiLine !== 0) {
      this.showMultiLine = true;
      this.numberOfLines = this.data.multiLine;
    }

    this.fieldForm = new FormGroup({
      field: new FormControl(this.data.fieldValue)
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.fieldForm.valid) {
      const field = this.fieldForm.get("field").value;
      this.dialogRef.close({fieldValue: field});
    }
  }
}
