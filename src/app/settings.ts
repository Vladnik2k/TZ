import {languagesWithCodes} from './constants';
import {MethodEnum} from './method.enum';

export class Settings {
  text = '';
  validatedText = '';
  resultText = '';

  additionalRowIndex = 1;
  additionalColIndex = 0;
  codes = languagesWithCodes.en;

  method = MethodEnum.NORMAL;

  isBack = false;
  isNeedAnimation = false;
  isAnimation = false;

  stringBefore: string;
  stringAfter: string;
}
