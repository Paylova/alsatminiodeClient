import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';






@NgModule({
  declarations: [
    AdminsComponent,
    ListComponent,
    CreateComponent,
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
    NgxMaskModule.forRoot(),
    RouterModule.forChild([
      { path : "",component : AdminsComponent }
    ])

  ]
})
export class AdminsModule { }
