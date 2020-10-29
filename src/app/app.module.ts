import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Lab3Component} from './lab3/lab3.component';
import {AppRoutingModule} from './app-routing.module';
import {NewPasswordComponent} from './lab4/new-password/new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    Lab3Component,
    NewPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
