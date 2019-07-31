import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface Dialog1FieldData {
  title: string;
  buttonText: string;
  fieldLabel: string;
  fieldValue: string;
  multiLine: number;
  text?: string;
  type?: string;
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
  text: string = null;
  type = "normal";
  validateForEmail = false;
  validate = false;
  inputType = "text";
  constructor(
    public dialogRef: MatDialogRef<Dialog1FieldComponent, Dialog1FieldResult>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog1FieldData) { }

  ngOnInit() {
    this.title = this.data.title;
    this.buttonText = this.data.buttonText;

    if (this.data.text) {
      this.text = this.data.text;
    }

    if (this.data.multiLine !== 0) {
      this.showMultiLine = true;
      this.numberOfLines = this.data.multiLine;
    }

    const validators = [];
    if (this.data.type && this.data.type === "email") {
      this.validateForEmail = true;
      this.validate = true;
      this.inputType = "email";
      validators.push(Validators.email);
    }

    this.fieldForm = new FormGroup({
      field: new FormControl(this.data.fieldValue, validators)
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.fieldForm.valid) {
      this.dialogRef.close({fieldValue: this.fieldForm.get("field").value});
    }
  }
}
