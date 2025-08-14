import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictsComponent } from './districts.component';
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
import { MatSelectModule } from '@angular/material/select';
import { DeleteDistrictDirective } from 'src/app/directives/admin/delete-district.directive';



@NgModule({
  declarations: [
    DistrictsComponent,
    ListComponent,
    CreateComponent,
    DeleteDistrictDirective
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path : "",component : DistrictsComponent }
    ])
  ]
})
export class DistrictsModule { }
