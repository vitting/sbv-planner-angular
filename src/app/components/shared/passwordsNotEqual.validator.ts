import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordsNotEqual(password: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (password !== control.value) {
      return {passwordsNotEqual: true};
    }
    return null;
  };
}
