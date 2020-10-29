import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Lab3Component} from './lab3/lab3.component';
import {NewPasswordComponent} from './lab4/new-password/new-password.component';

const routes: Routes = [
  { path: 'lab3', component: Lab3Component },
  { path: 'lab4/create-pass', component: NewPasswordComponent },
  { path: '',   redirectTo: '/lab4/create-pass', pathMatch: 'full' },
  { path: '**',   redirectTo: '/lab4/create-pass', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
