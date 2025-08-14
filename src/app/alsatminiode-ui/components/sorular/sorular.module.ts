import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SorularComponent } from './sorular.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SorularComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path : "", component : SorularComponent}
    ])
  ]
})
export class SorularModule { }
