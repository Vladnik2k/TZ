import {AlgorithmBase} from './algorithm-base';
import {Part} from '../part/part';
import {PartStatusesEnum} from '../part/part-statuses.enum';

export class Standard extends AlgorithmBase {
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
    for (let i = 0; i < text.length; i += 2) {
      this.settings.parts.push(new Part(text.slice(i, i + 2)));
    }
  }

  getNextValue(part: Part): void {
    for (let i = 0; i < this.settings.code.length; i++) {
      for (let j = 0; j < this.settings.code[i].length; j++) {
        if (this.settings.code[i][j].indexOf(part.before.toUpperCase()) !== -1) {
          part.result = `${i + 1}${j + 1}`;
          part.status = PartStatusesEnum.DONE;
          return;
        }
      }
    }

    part.status = PartStatusesEnum.ERROR;
  }

  getBackValue(part: Part): void {
    const indexes = +part.before;
    if (!indexes) { part.status = PartStatusesEnum.ERROR; return; }

    const i = Math.floor(indexes / 10) - 1;
    const j = indexes % 10 - 1;
    if (i >= this.settings.code.length || i < 0 ||
      j >= this.settings.code[0].length || j < 0) {
      part.status = PartStatusesEnum.ERROR; return;
    }

    part.result = this.settings.code[i][j][0].toLowerCase();
    part.status = PartStatusesEnum.DONE;

    if (!part.result) { part.status = PartStatusesEnum.ERROR; }
  }

}
