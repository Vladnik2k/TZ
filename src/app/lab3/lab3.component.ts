import {Component, OnInit} from '@angular/core';
import {MethodEnum} from './method.enum';
import {Settings} from './settings';
import {AlgorithmBase} from './algorithms/algorithm-base';
import {PartStatusesEnum} from './part/part-statuses.enum';
import {Symbol} from './algorithms/symbol';
import {Standard} from './algorithms/standard';
import {en} from './constants';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-lab3',
  templateUrl: './lab3.component.html',
  styleUrls: ['./lab3.component.scss']
})
export class Lab3Component implements OnInit {
  text: string;
  selectedMethod: MethodEnum;
  settings: Settings;
  algorithm: AlgorithmBase;

  status = PartStatusesEnum;
  method = MethodEnum;

  translatedText: string;
  translatedMethod: string;

  constructor(private router: Router, private http: HttpClient) {
    this.settings = new Settings();
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3001/').subscribe((data: any) => {
      if (data.status === 'no') {
        this.router.navigate(['/lab5']);
      }
    });
    if (localStorage.getItem('password')) {
      if (localStorage.getItem('isLab3Available') === 'false') {
        this.router.navigate(['/lab4/enter-pass']);
      }
    } else {
      this.router.navigate(['/lab4/create-pass']);
    }
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

  changeLocal(): void {
    this.http.get('http://localhost:3001/set').subscribe(_ => {
      this.http.get('http://localhost:3001/').subscribe((data: any) => {
        if (data.status === 'no') {
          this.router.navigate(['/lab5']);
        }
      });
    });
  }
}
