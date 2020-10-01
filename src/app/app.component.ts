import {Component} from '@angular/core';
import {Algorithm} from './algorithm';
import {LanguagesEnum} from './languages.enum';
import {Settings} from './settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  LanguagesEnum = LanguagesEnum;

  settings: Settings;

  constructor() {
    this.settings = new Settings();
  }

  click() {
    const normal = new Algorithm(this.settings);
    normal.startAlgorithm();
  }
}
