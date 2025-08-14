import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CihazinidegerlendirComponent } from './cihazinidegerlendir.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CihazinidegerlendirComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path : "", component : CihazinidegerlendirComponent}
    ])
  ]
})
export class CihazinidegerlendirModule { }
