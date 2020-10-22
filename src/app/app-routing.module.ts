import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Lab3Component} from './lab3/lab3.component';

const routes: Routes = [
  { path: 'lab3', component: Lab3Component },
  { path: '',   redirectTo: '/lab3', pathMatch: 'full' },
  { path: '**',   redirectTo: '/lab3', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }