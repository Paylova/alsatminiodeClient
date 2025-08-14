import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';
import { PhonequestionComponent } from './phonequestion.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';



@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    PhonequestionComponent,
    
  ],
  imports: [
    CommonModule,
    MatInputModule,FormsModule,ReactiveFormsModule,
    MatFormFieldModule,MatButtonModule,MatTableModule,
    MatPaginatorModule,MatIconModule,
    RouterModule.forChild([
      {path : "",component : PhonequestionComponent}
    ])
  ],
  exports: [
    
  ],
})
export class PhonequestionModule { }
