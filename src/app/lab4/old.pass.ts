import {ErrorInfo, keysEnum} from './shared.models';

export const OldPassErrors: Array<ErrorInfo> = [
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
