import {AlgorithmBase} from './algorithm-base';
import {Part} from '../part/part';
import {PartStatusesEnum} from '../part/part-statuses.enum';

export class Symbol extends AlgorithmBase {
  constructor(settings) {
    super(settings);
  }

  divideTextForNext(text: string): void {
    this.settings.parts = new Array<Part>();
    for (const symbol of text) {
      this.settings.parts.push(new Part(symbol));
    }
  }

  divideTextForBack(text: string): void {
    this.settings.parts = new Array<Part>();
    for (const symbol of text) {
      this.settings.parts.push(new Part(symbol));
    }
  }

  getNextValue(part: Part): void {
    this.updateValue(part, this.settings.additionalRowIndex, this.settings.additionalColIndex);
  }

  getBackValue(part: Part): void {
    this.updateValue(part, -1 * this.settings.additionalRowIndex, -1 * this.settings.additionalColIndex);
  }

  updateValue(part: Part, additionalRowIndex: number, additionalColIndex: number): void {
    part.status = PartStatusesEnum.IN_PROGRESS;

    const isUpperCase = part.before === part.before.toUpperCase();

    for (let i = 0; i < this.settings.code.length; i++) {
      for (let j = 0; j < this.settings.code[i].length; j++) {
        if (this.settings.code[i][j].indexOf(part.before.toUpperCase()) !== -1) {
          const ii = (i + additionalRowIndex + this.settings.code.length) % this.settings.code.length;
          const jj = (j + additionalColIndex + this.settings.code[0].length) % this.settings.code[0].length;
          part.result = isUpperCase ? this.settings.code[ii][jj][0].toUpperCase() : this.settings.code[ii][jj][0].toLowerCase();
          part.status = PartStatusesEnum.DONE;
          return;
        }
      }
    }

    part.status = PartStatusesEnum.ERROR;
  }

}
