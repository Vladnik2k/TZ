import {Injectable} from '@angular/core';
import {ErrorInfo, keysEnum} from './shared.models';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Dictionary} from './dictionary';

@Injectable()
export class PassService {
  public static newPassErrors: Array<ErrorInfo> = [
    {
      key: keysEnum.REQUIRED,
      name: 'Пароль повинен принаймні бути',
      disabled: true,
      message: 'Пароль повинен бути не пустий',
      isInUse: true
    },
    {
      key: keysEnum.FORBIDDEN_DICTIONARY,
      name: 'Перевірка за словником',
      description: 'За матеріалами: Perfect Passwords, Mark Burnett',
      message: 'Заборонений за словником',
      additionalValue: 2,
      isInUse: true
    },
    {
      key: keysEnum.AT_LEAST_BIG_LETTER,
      name: 'Обов\'язкова велика літера',
      message: 'Потрібна хоча б одна велика буква',
      isInUse: true
    },
    {
      key: keysEnum.AT_LEAST_SMALL_LETTER,
      name: 'Обов\'язкова маленька літера',
      message: 'Потрібна хоча б одна маленька буква',
      isInUse: true
    },
    {
      key: keysEnum.AT_LEAST_ONE_DIGIT,
      name: 'Обов\'язкова цифра',
      message: 'Потрібна хоча б одна цифра',
      isInUse: true
    },
    {
      key: keysEnum.AT_LEAST_ADD_SYMBOL,
      name: 'Обов\'язковий спец символ',
      description: '!@#$%^&*',
      message: 'Потрібнен хоча б один спецсимвол',
      isInUse: true
    },
    {
      key: keysEnum.NOT_LESS_SYMBOLS,
      name: 'Мінімальна кількість символів',
      message: 'Мінімальна кількість символів: ',
      additionalValue: 4,
      isInUse: true
    },
    {
      key: keysEnum.NOT_MORE_SYMBOLS,
      name: 'Максимальна кількість символів',
      message: 'Максимальна кількість символів: ',
      additionalValue: 20,
      isInUse: true
    },
  ];

  public static oldPassErrors: Array<ErrorInfo> = [
    {
      key: keysEnum.TIME_CHECKING,
      name: 'Перевірка часу введення пароля (у секундах)',
      message: '',
      isInUse: true,
      additionalValue: 120
    },
    {
      key: keysEnum.NUMBER_OF_INPUTS,
      name: 'Перевірка кількості спроб введення',
      message: '',
      isInUse: true,
      additionalValue: 5
    },
  ];

  static forbiddenDictionaryValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return Dictionary
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
        const errorMap = this.newPassErrors.find(mapping => mapping.key === error);
        if (error === keysEnum.NOT_LESS_SYMBOLS || error === keysEnum.NOT_MORE_SYMBOLS) {
          return errorMap.message + (errorMap.additionalValue ? errorMap.additionalValue : 0);
        }
        return errorMap.message;
      });
  }

  static getAddValue(key: keysEnum): number {
    return +this.newPassErrors.find(mapping => mapping.key === key).additionalValue;
  }
}
