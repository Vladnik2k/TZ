import {AbstractControl, ValidatorFn} from '@angular/forms';

export class NewPasswordValidators {
  static errorsMapping = [
    { key: 'required', message: 'Пароль повинен бути не пустий'},
    { key: 'forbiddenDictionary', message: 'Заборонений згідно словнику' },
  ];

  static forbiddenWords = [
    'aaa',
    'bbb'
  ];

  static forbiddenWordsNumber = 2;

  static forbiddenDictionaryValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return NewPasswordValidators.forbiddenWords
        .slice(0, this.forbiddenWordsNumber)
        .find(word => word === control.value) ? {forbiddenDictionary: true} : null;
    };
  }

  static getErrorMessages(errors): Array<string> {
    return Object.keys(errors)
      .map(error => NewPasswordValidators.errorsMapping.find(mapping => mapping.key === error).message);
  }
}
