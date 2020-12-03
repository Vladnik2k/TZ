import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorInfo, keysEnum} from '../shared.models';
import {PassService} from '../pass.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  addPasswordForm: FormGroup;
  newPassErrors;
  oldPassErrors;
  isVisiblePassword = false;
  password: string;

  get isNewValid(): boolean {
    return this.addPasswordForm.controls.newPassword.valid;
  }

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3001/').subscribe((data: any) => {
      if (data.status === 'no') {
        this.router.navigate(['/lab5']);
      }
    });
    this.addPasswordForm = new FormGroup({
      newPassword: new FormControl('')
    });
    this.setPasswordSettings();
    this.changeCheckboxes();
    this.password = localStorage.getItem('password');
  }

  save(): void {
    localStorage.setItem('password', this.addPasswordForm.controls.newPassword.value);
    localStorage.setItem('isLab3Available', String(false));
    this.password = localStorage.getItem('password');
  }

  setPasswordSettings(): void {
    const newPassErrors = localStorage.getItem('newPassErrors');
    const oldPassErrors = localStorage.getItem('oldPassErrors');

    if (newPassErrors) {
      PassService.newPassErrors = JSON.parse(newPassErrors);
    }
    if (oldPassErrors) {
      PassService.oldPassErrors = JSON.parse(oldPassErrors);
    }

    this.oldPassErrors = PassService.oldPassErrors;
    this.newPassErrors = PassService.newPassErrors;
  }

  getErrors(): Array<string> {
    if (!this.isNewValid) {
      return PassService.getErrorMessages(this.addPasswordForm.controls.newPassword.errors);
    }
  }

  updateNew(): void {
    this.addPasswordForm.controls.newPassword.updateValueAndValidity();
    setTimeout(() => {
      localStorage.setItem('newPassErrors', JSON.stringify(PassService.newPassErrors));
      localStorage.setItem('oldPassErrors', JSON.stringify(PassService.oldPassErrors));
    });
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
        if (err.key === keysEnum.FORBIDDEN_DICTIONARY) { return PassService.forbiddenDictionaryValidator(); }
        if (err.key === keysEnum.AT_LEAST_BIG_LETTER) { return PassService.atLeastBigLetterValidator(); }
        if (err.key === keysEnum.AT_LEAST_SMALL_LETTER) { return PassService.atLeastSmallLetterValidator(); }
        if (err.key === keysEnum.AT_LEAST_ONE_DIGIT) { return PassService.atLeastOneDigitValidator(); }
        if (err.key === keysEnum.AT_LEAST_ADD_SYMBOL) { return PassService.atLeastOneAddSymbolValidator(); }
        if (err.key === keysEnum.NOT_LESS_SYMBOLS) { return PassService.notLessSymbolsValidator(); }
        if (err.key === keysEnum.NOT_MORE_SYMBOLS) { return PassService.notMoreSymbolsValidator(); }
      });

    this.addPasswordForm.controls.newPassword.setValidators(validators);
    this.updateNew();
  }
}
