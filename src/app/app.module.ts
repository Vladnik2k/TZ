import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { Lab3Component } from './lab3/lab3.component';
import {AppRoutingModule} from './app-routing.module';
import { Lab4Component } from './lab4/lab4.component';

@NgModule({
  declarations: [
    AppComponent,
    Lab3Component,
    Lab4Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
