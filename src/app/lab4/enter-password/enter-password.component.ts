import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss']
})
export class EnterPasswordComponent implements OnInit {
  isNotValid = false;
  numberOfTrying = 0;
  waitingTime = Date.now();
  wrongTime = Date.now();

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  enter(input): void {
    if (localStorage.getItem('password') !== input.value) {
      this.numberOfTrying++;
    } else {
      localStorage.setItem('isLab3Available', String(true));
      this.router.navigate(['/lab3']);
    }
  }

}
