import {PartStatusesEnum} from './part-statuses.enum';

export class Part {
  before: string;
  result: string;
  status: PartStatusesEnum = PartStatusesEnum.PENDING;

  constructor(before: string) {
    this.before = before;
  }
}
