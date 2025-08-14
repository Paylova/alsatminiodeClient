import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,ReactiveFormsModule,FormsModule,
    RouterModule.forChild([
      { path : "" , component : DashboardComponent }
    ])
  ]
})
export class DashboardModule { }
