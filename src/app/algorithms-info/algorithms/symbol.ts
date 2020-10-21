import {AlgorithmBase} from './algorithm-base';
import {Part} from '../part/part';
import {PartStatusesEnum} from '../part/part-statuses.enum';

export class Symbol extends AlgorithmBase {
  constructor(settings) {
    super(settings);
  }

  protected divideTextForNext(text: string): void {
    this.settings.parts = new Array<Part>();
    for (const symbol of text) {
      this.settings.parts.push(new Part(symbol));
    }
  }

  protected divideTextForBack(text: string): void {
    this.settings.parts = new Array<Part>();
    for (const symbol of text) {
      this.settings.parts.push(new Part(symbol));
    }
  }

  protected getNextValue(part: Part): void {
    this.updateValue(part, this.settings.additionalRowIndex, this.settings.additionalColIndex);
  }

  protected getBackValue(part: Part): void {
    this.updateValue(part, -1 * this.settings.additionalRowIndex, -1 * this.settings.additionalColIndex);
  }

  private updateValue(part: Part, additionalRowIndex: number, additionalColIndex: number): void {
    const isUpperCase = part.before === part.before.toUpperCase();

    for (let i = 0; i < this.settings.code.length; i++) {
      for (let j = 0; j < this.settings.code[i].length; j++) {
        if (this.settings.code[i][j].indexOf(part.before.toUpperCase()) !== -1) {
          const ii = this.getIndex(i, additionalRowIndex, this.settings.code.length);
          const jj = this.getIndex(j, additionalColIndex, this.settings.code[0].length);
          part.result = isUpperCase ? this.settings.code[ii][jj][0].toUpperCase() : this.settings.code[ii][jj][0].toLowerCase();
          part.status = PartStatusesEnum.DONE;
          return;
        }
      }
    }

    part.status = PartStatusesEnum.ERROR;
  }

  private getIndex(index, additional, max): number {
    return (index + additional + max) % max;
  }

}
