import {AbstractControl, ValidatorFn} from '@angular/forms';
import {keysEnum, NewPassErrors} from './new.pass.errors';
import {Dictionary} from './dictionary';

export class NewPasswordValidators {
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
        const errorMap = NewPassErrors.find(mapping => mapping.key === error);
        if (error === keysEnum.NOT_LESS_SYMBOLS || error === keysEnum.NOT_MORE_SYMBOLS) {
          return errorMap.message + errorMap.additionalValue;
        }
        return errorMap.message;
      });
  }

  static getAddValue(key: keysEnum): number {
    return +NewPassErrors.find(mapping => mapping.key === key).additionalValue;
  }
}
