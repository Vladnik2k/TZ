import {Component} from '@angular/core';
import {Settings} from './algorithms-info/settings';
import {Standard} from './algorithms-info/algorithms/standard';
import {AlgorithmBase} from './algorithms-info/algorithms/algorithm-base';
import {PartStatusesEnum} from './algorithms-info/part/part-statuses.enum';
import {MethodEnum} from './algorithms-info/method.enum';
import {Symbol} from './algorithms-info/algorithms/symbol';
import {en} from './constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text: string;
  selectedMethod: MethodEnum;
  settings: Settings;
  algorithm: AlgorithmBase;

  status = PartStatusesEnum;
  method = MethodEnum;

  translatedText: string;
  translatedMethod: string;

  constructor() {
    this.settings = new Settings();
  }

  click(): void {
    if (!this.text) { return; }
    this.algorithm = this.selectedMethod === this.method.SYMBOL_CUSTOM || this.selectedMethod === this.method.SYMBOL ?
      new Symbol(this.settings) : new Standard(this.settings);
    this.algorithm.startAlgorithm(this.text);
    this.translatedText = this.text;
    this.translatedMethod = this.selectedMethod;
  }

  useResult(): void {
    this.text = this.algorithm.result;
    this.settings.isBack = !this.settings.isBack;
  }

  changeAlgorithm(select: MethodEnum): void {
    if (select === this.method.SYMBOL_CUSTOM || select === this.method.NUMBER_CUSTOM) {
      this.generateField();
    } else {
      this.settings.code = en;
    }
    this.selectedMethod = select;
  }

  generateField(): void {
    const oneArray = [];
    this.settings.code.forEach(row => row.forEach(element => oneArray.push(element)));
    oneArray.sort((a, b) => 0.5 - Math.random());
    const newCode = [];
    for (let i = 0; i < this.settings.code.length; i++) {
      newCode.push([]);
      for (let j = 0; j < this.settings.code[0].length; j++) {
        newCode[i][j] = oneArray[i * this.settings.code.length + j];
      }
    }
    this.settings.code = newCode;
  }
}
