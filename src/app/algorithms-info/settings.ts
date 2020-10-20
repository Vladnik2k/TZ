import {Part} from './part/part';
import {en} from '../constants';

export class Settings {
  parts: Array<Part>;

  code = en;

  isBack = false;
  isNeedAnimation = false;

  additionalRowIndex = 1;
  additionalColIndex = 1;

  isAnimation = false;
}
