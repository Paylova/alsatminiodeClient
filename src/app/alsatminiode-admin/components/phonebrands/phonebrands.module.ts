import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonebrandsComponent } from './phonebrands.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteBrandDirective } from 'src/app/directives/admin/delete-brand.directive';



@NgModule({
  declarations: [
    PhonebrandsComponent,
    ListComponent,
    CreateComponent,
    DeleteBrandDirective
      
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
    MatDialogModule,
    RouterModule.forChild([
      { path : "", component : PhonebrandsComponent }
    ])
  ]
})
export class PhonebrandsModule { }
