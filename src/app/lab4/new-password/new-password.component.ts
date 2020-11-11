import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewPasswordValidators} from './new-password-validators';
import {NewPassErrors} from './new.pass.errors';
import {ErrorInfo, keysEnum} from '../shared.models';
import {OldPassErrors} from '../old.pass';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  password = '';
  addPasswordForm: FormGroup;
  newPassErrors = NewPassErrors;
  oldPassErrors = OldPassErrors;
  isVisiblePassword = false;

  get isNewValid(): boolean {
    return this.addPasswordForm.controls.newPassword.valid;
  }

  constructor() { }

  ngOnInit(): void {
    this.addPasswordForm = new FormGroup({
      newPassword: new FormControl('')
    });
    this.changeCheckboxes();
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

  changeCheckboxes(changeIndex?: number): void {
    const validators = this.newPassErrors
      .filter((err, index) => changeIndex === index ? !err.isInUse : err.isInUse)
      .map(err => {
        if (err.key === keysEnum.REQUIRED) { return Validators.required; }
        if (err.key === keysEnum.FORBIDDEN_DICTIONARY) { return NewPasswordValidators.forbiddenDictionaryValidator(); }
        if (err.key === keysEnum.AT_LEAST_BIG_LETTER) { return NewPasswordValidators.atLeastBigLetterValidator(); }
        if (err.key === keysEnum.AT_LEAST_SMALL_LETTER) { return NewPasswordValidators.atLeastSmallLetterValidator(); }
        if (err.key === keysEnum.AT_LEAST_ONE_DIGIT) { return NewPasswordValidators.atLeastOneDigitValidator(); }
        if (err.key === keysEnum.AT_LEAST_ADD_SYMBOL) { return NewPasswordValidators.atLeastOneAddSymbolValidator(); }
        if (err.key === keysEnum.NOT_LESS_SYMBOLS) { return NewPasswordValidators.notLessSymbolsValidator(); }
        if (err.key === keysEnum.NOT_MORE_SYMBOLS) { return NewPasswordValidators.notMoreSymbolsValidator(); }
      });

    this.addPasswordForm.controls.newPassword.setValidators(validators);
    this.updateNew();
  }
}
