import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteoptionsComponent } from './websiteoptions.component';
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



@NgModule({
  declarations: [
    WebsiteoptionsComponent,
    CreateComponent,
    ListComponent,
    
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
    RouterModule.forChild([
      { path : "", component : WebsiteoptionsComponent }
    ])
  ]
})
export class WebsiteoptionsModule { }
