import {Settings} from '../settings';
import {Part} from '../part/part';
import {PartStatusesEnum} from '../part/part-statuses.enum';

export abstract class AlgorithmBase {
  public settings: Settings;
  public result: string;

  protected constructor(settings: Settings) {
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

  private startAnimation(): void {
    let i = 0;
    this.settings.isAnimation = true;
    this.settings.parts[i].status = PartStatusesEnum.IN_PROGRESS;
    const interval = setInterval(() => {
      this.updatePart(this.settings.parts[i]);
      ++i;
      if (this.settings.parts.length <= i) {
        this.fillResult();
        this.settings.isAnimation = false;
        clearInterval(interval);
      } else {
        this.settings.parts[i].status = PartStatusesEnum.IN_PROGRESS;
      }
    }, 1000);
  }

  private updatePart(part: Part): void {
    this.settings.isBack ? this.getBackValue(part) : this.getNextValue(part);
  }

  private fillResult(): void {
    this.result = this.settings.parts
      .filter(part => part.status === PartStatusesEnum.DONE)
      .map(part => part.result)
      .join('');
  }

  protected abstract divideTextForNext(text: string): void;
  protected abstract divideTextForBack(text: string): void;
  protected abstract getNextValue(part: Part): void;
  protected abstract getBackValue(part: Part): void;
}
