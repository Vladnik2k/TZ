import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Lab3Component} from './lab3/lab3.component';
import {AppRoutingModule} from './app-routing.module';
import {NewPasswordComponent} from './lab4/new-password/new-password.component';
import { EnterPasswordComponent } from './lab4/enter-password/enter-password.component';
import {PassService} from './lab4/pass.service';

@NgModule({
  declarations: [
    AppComponent,
    Lab3Component,
    NewPasswordComponent,
    EnterPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [PassService],
  bootstrap: [AppComponent]
})
export class AppModule { }
