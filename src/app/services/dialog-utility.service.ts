import { Injectable } from '@angular/core';
import { DialogConfirmData } from '../components/shared/dialog-confirm/dialog-confirm.component';
import { Dialog2FieldsData } from '../components/shared/dialog-2-fields/dialog-2-fields.component';
import { Dialog1FieldData } from '../components/shared/dialog-1-field/dialog-1-field.component';
type ConfirmButtonText = 'Ja' | 'Nej' | 'Ok' | null;
type DialogButtonText = 'Gem' | 'Opdater' | 'Tilføj';

@Injectable({
  providedIn: 'root'
})
export class DialogUtilityService {

  constructor() { }

  getDialogConfirmData(
    header: string,
    message1: string,
    message2: string = null,
    message3: string = null,
    buttonOkText: ConfirmButtonText = null,
    button1Text: ConfirmButtonText = "Ja",
    button2Text: ConfirmButtonText = "Nej"): DialogConfirmData {
    return {
      header,
      button1Text,
      button2Text,
      message1,
      message2,
      message3,
      buttonOkText
    };
  }

  getDialog2FieldsData(
    title: string,
    buttonText: DialogButtonText,
    field1Label: string,
    field2Label: string,
    field1Value: string = null,
    field2Value: string = null): Dialog2FieldsData {
    return {
      title,
      buttonText,
      field1Label,
      field1Value,
      field2Label,
      field2Value
    };
  }

  getDialog1FieldData(
    title: string,
    buttonText: DialogButtonText,
    fieldLabel: string,
    fieldValue: string = null,
    multiLine = 0): Dialog1FieldData {
    return {
      title,
      buttonText,
      fieldLabel,
      fieldValue,
      multiLine
    };
  }
}
