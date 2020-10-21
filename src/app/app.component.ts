import {Component} from '@angular/core';
import {Settings} from './algorithms-info/settings';
import {Standard} from './algorithms-info/algorithms/standard';
import {AlgorithmBase} from './algorithms-info/algorithms/algorithm-base';
import {PartStatusesEnum} from './algorithms-info/part/part-statuses.enum';
import {MethodEnum} from './algorithms-info/method.enum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text: string;
  settings: Settings;
  algorithm: AlgorithmBase;

  status = PartStatusesEnum;
  method = MethodEnum;

  translatedText: string;
  methodSame: boolean;

  constructor() {
    this.settings = new Settings();
  }

  click(): void {
    this.algorithm = new Standard(this.settings);
    this.algorithm.startAlgorithm(this.text);
    this.translatedText = this.text;
    this.methodSame = true;
  }

  useResult(): void {
    this.text = this.algorithm.result;
    this.settings.isBack = !this.settings.isBack;
  }

  changeAlgorithm(select: MethodEnum): void {
    if (select === this.method.SYMBOL_CUSTOM || select === this.method.NUMBER_CUSTOM) {
      this.generateField();
    }
    this.methodSame = false;
  }

  generateField(): void {
    console.log('asd');
  }
}
