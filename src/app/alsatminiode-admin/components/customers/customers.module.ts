import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from '../customers/customers.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import {MatSelectModule} from '@angular/material/select';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';



@NgModule({
  declarations: [
    CustomersComponent,
    ListComponent, 
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    DialogModule,
    MatSelectModule,
    RouterModule.forChild([
      { path : "", component : CustomersComponent }
    ])
  ],
})
export class CustomersModule { }
