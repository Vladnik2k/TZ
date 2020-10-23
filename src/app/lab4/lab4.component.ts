import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewPasswordValidators} from './new-password-validators';

@Component({
  selector: 'app-lab4',
  templateUrl: './lab4.component.html',
  styleUrls: ['./lab4.component.scss']
})
export class Lab4Component implements OnInit {

  password: string;
  addPasswordForm: FormGroup;

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

}
