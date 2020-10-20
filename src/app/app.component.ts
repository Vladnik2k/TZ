import {Component} from '@angular/core';
import {Algorithm} from './algorithm';
import {Settings} from './settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  settings: Settings;

  constructor() {
    this.settings = new Settings();
  }

  click(): void {
    const normal = new Algorithm(this.settings);
    normal.startAlgorithm();
  }

  useResult(): void {
    this.settings.text = this.settings.resultText;
    this.settings.isBack = !this.settings.isBack;
  }
}
