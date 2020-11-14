import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PassService} from '../pass.service';
import {ErrorInfo, keysEnum} from '../shared.models';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss']
})
export class EnterPasswordComponent implements OnInit {
  oldPassErrors: Array<ErrorInfo>;
  disable: boolean;

  numberOfInputs: ErrorInfo;
  timeChecking: ErrorInfo;

  numberOfTrying;
  intervalWaiting;
  disableInterval;
  secondForShow;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkRedirect();
    this.setPasswordSettings();
    this.startAll();
  }

  checkRedirect(): void {
    if (!localStorage.getItem('password')) {
      this.router.navigate(['/lab4/create-pass']);
    }
  }

  setPasswordSettings(): void {
    const old = localStorage.getItem('oldPassErrors');
    this.oldPassErrors = (old ? JSON.parse(old) : PassService.oldPassErrors);
  }

  startAll(): void {
    clearInterval(this.disableInterval);
    this.disable = false;
    this.numberOfTrying = 0;
    this.timeChecking = this.oldPassErrors.find(err => err.key === keysEnum.TIME_CHECKING);
    this.numberOfInputs = this.oldPassErrors.find(err => err.key === keysEnum.NUMBER_OF_INPUTS);

    if (this.timeChecking.isInUse) {
      this.startWaitingInterval();
    }
  }

  enter(input): void {
    if (localStorage.getItem('password') === input.value) {
      localStorage.setItem('isLab3Available', String(true));
      this.router.navigate(['/lab3']);
      return;
    }
    if (this.numberOfInputs.key && ++this.numberOfTrying > +this.numberOfInputs.additionalValue) {
      this.disableEverything();
    }
  }

  private disableEverything(): void {
    this.disable = true;
    clearInterval(this.intervalWaiting);
    this.startDisableInterval();
  }

  private startWaitingInterval(): void {
    this.secondForShow = +this.timeChecking.additionalValue;
    this.intervalWaiting = setInterval(() => {
      if (this.secondForShow <= 0) {
        this.disableEverything();
      }
      --this.secondForShow;
    }, 1000);
  }

  private startDisableInterval(): void {
    this.secondForShow = 120;
    this.disableInterval = setInterval(() => {
      if (this.secondForShow <= 0) {
        this.startAll();
      }
      --this.secondForShow;
    }, 1000);
  }
}
