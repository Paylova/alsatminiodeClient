import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YakindaComponent } from './yakinda.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    YakindaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path : "", component : YakindaComponent}
    ])
  ]
})
export class YakindaModule { }
