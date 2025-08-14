import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonesituationsComponent } from './phonesituations.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { DeletePhoneSituationDirective } from 'src/app/directives/admin/delete-phone-situation.directive';



@NgModule({
  declarations: [
    PhonesituationsComponent,
    CreateComponent,
    ListComponent,
    DeletePhoneSituationDirective
    
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
      { path : "", component : PhonesituationsComponent}
    ])
  ]
})
export class PhonesituationsModule { }
