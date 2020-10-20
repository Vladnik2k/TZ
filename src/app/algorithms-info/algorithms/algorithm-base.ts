import {Settings} from '../settings';
import {Part} from '../part/part';
import {PartStatusesEnum} from '../part/part-statuses.enum';

export abstract class AlgorithmBase {
  public settings: Settings;
  public result: string;

  constructor(settings: Settings) {
    this.settings = settings;
  }

  startAlgorithm(text): void {
    this.settings.isBack ? this.divideTextForBack(text) : this.divideTextForNext(text);
    if (this.settings.isNeedAnimation) {
      this.startAnimation();
    } else {
      this.settings.parts.forEach(part => this.updatePart(part));
      this.fillResult();
    }
  }

  startAnimation(): void {
    let i = 0;
    const interval = setInterval(() => {
      if (this.settings.parts.length === i) {
        this.fillResult();
        clearInterval(interval);
      }

      this.updatePart(this.settings.parts[i]);
      ++i;
    }, 1000);
  }

  updatePart(part: Part): void {
    this.settings.isBack ? this.getBackValue(part) : this.getNextValue(part);
  }

  fillResult(): void {
    this.result = this.settings.parts
      .filter(part => part.status === PartStatusesEnum.DONE)
      .map(part => part.result)
      .join('');
  }

  abstract divideTextForNext(text: string): void;
  abstract divideTextForBack(text: string): void;
  abstract getNextValue(part: Part): void;
  abstract getBackValue(part: Part): void;
}