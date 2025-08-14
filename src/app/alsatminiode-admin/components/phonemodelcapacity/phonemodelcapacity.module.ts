import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonemodelcapacityComponent } from './phonemodelcapacity.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { DialogModule } from '@angular/cdk/dialog';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PhonemodelcapacityComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    DialogModule,
    RouterModule.forChild([
      { path : "", component : PhonemodelcapacityComponent }
    ])
  ]
})
export class PhonemodelcapacityModule { }
