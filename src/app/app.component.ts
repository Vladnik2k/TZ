import {Component} from '@angular/core';
import {Settings} from './algorithms-info/settings';
import {Standard} from './algorithms-info/algorithms/standard';
import {AlgorithmBase} from './algorithms-info/algorithms/algorithm-base';
import {PartStatusesEnum} from './algorithms-info/part/part-statuses.enum';


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

  translatedText: string;

  constructor() {
    this.settings = new Settings();
  }

  click(): void {
    this.algorithm = new Standard(this.settings);
    this.algorithm.startAlgorithm(this.text);
    this.translatedText = this.text;
  }

  useResult(): void {
    this.text = this.algorithm.result;
    this.settings.isBack = !this.settings.isBack;
  }

  changeAlgorithm($event): void {
    console.log($event);
  }
}
