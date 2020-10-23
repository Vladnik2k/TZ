import {AbstractControl, ValidatorFn} from '@angular/forms';

export const enum keysEnum {
  REQUIRED = 'required',
  FORBIDDEN_DICTIONARY= 'forbiddenDictionary',
  AT_LEAST_BIG_LETTER = 'atLeastBigLetter',
  AT_LEAST_SMALL_LETTER = 'atLeastSmallLetter',
  AT_LEAST_ONE_DIGIT = 'atLeastOneDigit',
  AT_LEAST_ADD_SYMBOL = 'atLeastOneAddSymbol',
  NOT_LESS_SYMBOLS = 'notLessSymbols',
  NOT_MORE_SYMBOLS = 'notMoreSymbols',
}

export class NewPasswordValidators {
  static forbiddenWords = [
    'aaa',
    'bbb'
  ];

  static errorsMapping = [
    { key: keysEnum.REQUIRED, message: 'Пароль повинен бути не пустий' },
    { key: keysEnum.FORBIDDEN_DICTIONARY, message: 'Заборонений згідно словнику', additionalValue: 2 },
    { key: keysEnum.AT_LEAST_BIG_LETTER, message: 'Потрібна хоча б одна велика буква' },
    { key: keysEnum.AT_LEAST_SMALL_LETTER, message: 'Потрібна хоча б одна маленька буква' },
    { key: keysEnum.AT_LEAST_ONE_DIGIT, message: 'Потрібна хоча б одна цифра' },
    { key: keysEnum.AT_LEAST_ADD_SYMBOL, message: 'Потрібнен хоча б один спецсимвол' },
    { key: keysEnum.NOT_LESS_SYMBOLS, message: 'Мінімальна кількість символів: ', additionalValue: 4 },
    { key: keysEnum.NOT_MORE_SYMBOLS, message: 'Максимальна кількість символів: ', additionalValue: 6 },
  ];

  static forbiddenDictionaryValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this.forbiddenWords
        .slice(0, this.getAddValue(keysEnum.FORBIDDEN_DICTIONARY))
        .find(word => word === control.value) ? {forbiddenDictionary: true} : null;
    };
  }

  static atLeastBigLetterValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value.match(/(?=.*[A-Z])/) ? null : {atLeastBigLetter: true};
    };
  }

  static atLeastSmallLetterValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value.match(/(?=.*[a-z])/) ? null : {atLeastSmallLetter: true};
    };
  }

  static atLeastOneDigitValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value.match(/(?=.*[0-9])/) ? null : {atLeastOneDigit: true};
    };
  }

  static atLeastOneAddSymbolValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value.match(/(?=.*[!@#$%^&*])/) ? null : {atLeastOneAddSymbol: true};
    };
  }

  static notLessSymbolsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value.length < this.getAddValue(keysEnum.NOT_LESS_SYMBOLS) ? {notLessSymbols: true} :  null;
    };
  }

  static notMoreSymbolsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value.length > this.getAddValue(keysEnum.NOT_MORE_SYMBOLS) ? {notMoreSymbols: true} :  null;
    };
  }

  static getErrorMessages(errors): Array<string> {
    return Object.keys(errors)
      .map(error => {
        const errorMap = this.errorsMapping.find(mapping => mapping.key === error);
        if (error === keysEnum.NOT_LESS_SYMBOLS || error === keysEnum.NOT_MORE_SYMBOLS) {
          return errorMap.message + errorMap.additionalValue;
        }
        return errorMap.message;
      });
  }

  static getAddValue(key: keysEnum): any {
    return this.errorsMapping.find(mapping => mapping.key === key).additionalValue;
  }
}
