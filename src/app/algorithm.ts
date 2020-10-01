import {Settings} from './settings';

export class Algorithm {
  settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
  }

  startAlgorithm(): void {
    const text = this.settings.text.toUpperCase();
    this.settings.isNeedAnimation ? this.startWithAnimation(text) : this.startWithoutAnimation(text);
  }

  startWithAnimation(text): void {
    let i = 0;
    this.settings.isAnimation = true;
    const interval = setInterval(() => {
      if (text.length === i) {
        this.clearAnimationInfo(interval);
      }

      this.updateLetter(text[i++]);
    }, 1000);
  }

  startWithoutAnimation(text): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < text.length; i++) {
      this.updateLetter(text[i]);
    }
  }

  updateLetter(letter): void {
    const indexes = this.findSymbol(letter);

    if (indexes === '') {
      return;
    }

    const rowIndex = +indexes.split(' ')[0];
    const colIndex = +indexes.split(' ')[1];
    this.settings.resultText += this.getNextSymbol(rowIndex, colIndex);

    if (this.settings.isNeedAnimation) {
      this.settings.stringBefore = letter;
      this.settings.stringAfter = this.settings.resultText[this.settings.resultText.length - 1];
    }
  }

  findSymbol(symbol): string {
    for (let i = 0; i < this.settings.codes.length; i++) {
      for (let j = 0; j < this.settings.codes[i].length; j++) {
        if (this.settings.codes[i][j].indexOf(symbol) !== -1) {
          return i + ' ' + j;
        }
      }
    }

    return '';
  }

  getNextSymbol(i: number, j: number): string {
    let nextRowIndex = (i + this.settings.additionalRowIndex) % this.settings.codes.length;
    if (nextRowIndex < 0) { nextRowIndex += this.settings.codes.length; }
    let nextColIndex = (j + this.settings.additionalColIndex) % this.settings.codes[0].length;
    if (nextColIndex < 0) { nextColIndex += this.settings.codes[0].length; }

    return this.settings.codes[nextRowIndex][nextColIndex][0];
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

  private clearAnimationInfo(interval): void {
    this.settings.stringBefore = '';
    this.settings.stringAfter = '';
    this.settings.isAnimation = false;
    clearInterval(interval);
  }
}
