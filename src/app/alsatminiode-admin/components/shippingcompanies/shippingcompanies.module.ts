import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingcompaniesComponent } from './shippingcompanies.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ShippingcompaniesComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule.forChild([
      { path : "", component : ShippingcompaniesComponent}
    ])
  ]
})
export class ShippingcompaniesModule { }
