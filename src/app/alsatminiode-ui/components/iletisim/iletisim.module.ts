import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IletisimComponent } from './iletisim.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    IletisimComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path : "", component : IletisimComponent}
    ])
  ]
})
export class IletisimModule { }
