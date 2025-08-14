import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlsatminiodeLoginComponent } from './alsatminiode-login.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([
      { path : "", component : AlsatminiodeLoginComponent}
    ])
  ]
})
export class AlsatminiodeLoginModule { }
