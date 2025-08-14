import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonemodelsComponent } from './phonemodels.component';
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
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { DeleteModelDirective } from 'src/app/directives/admin/delete-model.directive';



@NgModule({
  declarations: [
    PhonemodelsComponent,
    ListComponent,
    CreateComponent,
    DeleteModelDirective
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
      { path : "", component : PhonemodelsComponent }
    ])
  ],
  exports : [
    
  ]
})
export class PhonemodelsModule { }
