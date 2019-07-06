import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

export interface Dialog2FieldsData {
  title: string;
  buttonText: string;
  field1Label: string;
  field2Label: string;
  field1Value: string;
  field2Value: string;
}

export interface Dialog2FieldsResult {
  field1Value: string;
  field2Value: string;
}

@Component({
  selector: 'app-dialog-2-fields',
  templateUrl: './dialog-2-fields.component.html',
  styleUrls: ['./dialog-2-fields.component.scss']
})
export class Dialog2FieldsComponent implements OnInit {
  title = "";
  buttonText = "";
  fieldForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<Dialog2FieldsComponent, Dialog2FieldsResult>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog2FieldsData) { }

  ngOnInit() {
    this.title = this.data.title;
    this.buttonText = this.data.buttonText;

    this.fieldForm = new FormGroup({
      field1: new FormControl(this.data.field1Value, [Validators.required]),
      field2: new FormControl(this.data.field2Value)
    });
  }

  onSubmit() {
    if (this.fieldForm.valid) {
      const field1 = this.fieldForm.get("field1").value;
      const field2 = this.fieldForm.get("field2").value;
      this.dialogRef.close({field1Value: field1, field2Value: field2});
    }
  }
}
