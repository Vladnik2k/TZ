export interface ErrorInfo {
  key: string;
  message: string;
  name: string;
  additionalValue?: number;
  disabled?: boolean;
  description?: string;
  isInUse: boolean;
}

export const enum keysEnum {
  REQUIRED = 'required',
  FORBIDDEN_DICTIONARY= 'forbiddenDictionary',
  AT_LEAST_BIG_LETTER = 'atLeastBigLetter',
  AT_LEAST_SMALL_LETTER = 'atLeastSmallLetter',
  AT_LEAST_ONE_DIGIT = 'atLeastOneDigit',
  AT_LEAST_ADD_SYMBOL = 'atLeastOneAddSymbol',
  NOT_LESS_SYMBOLS = 'notLessSymbols',
  NOT_MORE_SYMBOLS = 'notMoreSymbols',

  TIME_CHECKING = 'timeForInoutChecking',
  NUMBER_OF_INPUTS = 'numberOfInputs'
}
