import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HakkimizdaComponent } from './hakkimizda.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HakkimizdaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path : "", component : HakkimizdaComponent}
    ])
  ]
})
export class HakkimizdaModule { }
