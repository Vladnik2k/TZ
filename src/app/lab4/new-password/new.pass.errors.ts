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
}

export const NewPassErrors: Array<ErrorInfo> = [
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
