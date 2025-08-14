import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefonSatComponent } from './telefon-sat.component';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';




@NgModule({
  declarations: [
    TelefonSatComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    MatProgressBarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    DialogModule,
    FormsModule,
    MatRadioModule,
    MatSidenavModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path : "", component : TelefonSatComponent}
    ])
  ]
})
export class TelefonSatModule { }
