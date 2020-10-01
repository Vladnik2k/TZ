import {Settings} from './settings';

export class Algorithm {
  settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
  }

  startAlgorithm(): void {
    this.settings.resultText = '';
    const text = this.getValidatedText();
    this.settings.isNeedAnimation ? this.startWithAnimation(text) : this.startWithoutAnimation(text);
  }

  getValidatedText(): string {
    let text = this.settings.text;
    for (let i = 0; i < text.length; i++) {
      if (this.getCodeIndexes(text[i]) === '') {
        text = text.slice(0, i).concat(text.slice(i + 1));
        i--;
      }
    }

    return text;
  }

  startWithAnimation(text): void {
    let i = 0;
    this.settings.isAnimation = true;
    const interval = setInterval(() => {
      text.length === i ? this.clearAnimationInfo(interval) : this.updateLetter(text[i++]);
    }, 1000);
  }

  startWithoutAnimation(text): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < text.length; i++) {
      this.updateLetter(text[i]);
    }
  }

  updateLetter(letter: string): void {
    const isUpperCase = letter === letter.toUpperCase();
    const indexes = this.getCodeIndexes(letter);

    if (indexes === '') {
      return;
    }

    const rowIndex = +indexes.split(' ')[0];
    const colIndex = +indexes.split(' ')[1];

    const updatedString = this.settings.isBack ?
      this.getPreviousCode(rowIndex, colIndex) :
      this.getNextCode(rowIndex, colIndex);

    this.settings.resultText += isUpperCase ? updatedString.toUpperCase() : updatedString.toLowerCase();

    if (this.settings.isNeedAnimation) {
      this.settings.stringBefore = letter;
      this.settings.stringAfter = this.settings.resultText[this.settings.resultText.length - 1];
    }
  }

  getCodeIndexes(code: string): string {
    code = code.toUpperCase();

    for (let i = 0; i < this.settings.codes.length; i++) {
      for (let j = 0; j < this.settings.codes[i].length; j++) {
        if (this.settings.codes[i][j].indexOf(code) !== -1) {
          return i + ' ' + j;
        }
      }
    }

    return '';
  }

  getNextCode(i: number, j: number): string {
    let nextRowIndex = (i + this.settings.additionalRowIndex) % this.settings.codes.length;
    if (nextRowIndex < 0) { nextRowIndex += this.settings.codes.length; }
    let nextColIndex = (j + this.settings.additionalColIndex) % this.settings.codes[0].length;
    if (nextColIndex < 0) { nextColIndex += this.settings.codes[0].length; }

    return this.settings.codes[nextRowIndex][nextColIndex][0];
  }

  getPreviousCode(i: number, j: number): string {
    this.changeToPrev();
    const res = this.getNextCode(i, j);
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
