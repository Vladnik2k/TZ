import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewPasswordValidators} from './new-password-validators';
import {ErrorInfo, NewPassErrors} from './new.pass.errors';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  password = '';
  addPasswordForm: FormGroup;
  newPassErrors = NewPassErrors;

  get isNewValid(): boolean {
    return this.addPasswordForm.controls.newPassword.valid;
  }

  constructor() { }

  ngOnInit(): void {
    this.addPasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        NewPasswordValidators.forbiddenDictionaryValidator(),
        NewPasswordValidators.atLeastBigLetterValidator(),
        NewPasswordValidators.atLeastSmallLetterValidator(),
        NewPasswordValidators.atLeastOneDigitValidator(),
        NewPasswordValidators.atLeastOneAddSymbolValidator(),
        NewPasswordValidators.notLessSymbolsValidator(),
        NewPasswordValidators.notMoreSymbolsValidator(),
      ])
    });
  }

  save(): void {
    this.password = this.addPasswordForm.controls.newPassword.value;
  }

  getErrors(field): Array<string> {
    if (field === 'newPassword' && !this.isNewValid) {
      return NewPasswordValidators.getErrorMessages(this.addPasswordForm.controls.newPassword.errors);
    }
  }

  updateNew(): void {
    this.addPasswordForm.controls.newPassword.updateValueAndValidity();
  }

  inputChange(errorInfo: ErrorInfo): void {
    if (!+errorInfo.additionalValue) {
      errorInfo.additionalValue = 0;
    }

    this.updateNew();
  }
}
