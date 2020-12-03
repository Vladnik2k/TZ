import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lab5',
  templateUrl: './lab5.component.html',
  styleUrls: ['./lab5.component.scss']
})
export class Lab5Component implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3001/').subscribe((data: any) => {
      if (data.status === 'yes') {
        this.router.navigate(['/lab3']);
      }
    });
  }

  enterCode(input: any): void {
    this.http.get('http://localhost:3001/allow/' + input.value).subscribe((data: any) => {
      if (data.status === 'yes') {
        this.router.navigate(['/lab3']);
      }
    });
    input.value = '';
  }

}
