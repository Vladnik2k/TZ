import {Settings} from './settings';

export class Algorithm {
  settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
  }

  startAlgorithm(): void {
  }

  getNextSymbol(i: number, j: number): string {
    let nextRowIndex = (i + this.settings.additionalRowIndex) % this.settings.codes.length;
    if (nextRowIndex < 0) { nextRowIndex += this.settings.codes.length; }
    let nextColIndex = (j + this.settings.additionalColIndex) % this.settings.codes[0].length;
    if (nextColIndex < 0) { nextColIndex += this.settings.codes[0].length; }

    return this.settings.codes[nextRowIndex][nextColIndex];
  }

  getPreviousSymbol(i: number, j: number): string {
    this.changeToPrev();
    const res = this.getNextSymbol(i, j);
    this.changeToPrev();

    return res;
  }

  private changeToPrev(): void {
    this.settings.additionalColIndex = -1 * this.settings.additionalColIndex;
    this.settings.additionalRowIndex = -1 * this.settings.additionalRowIndex;
  }
}
