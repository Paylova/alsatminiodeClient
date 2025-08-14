import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsModule } from './admins/admins.module';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
import { CustomersModule } from './customers/customers.module';
import { DistrictsModule } from './districts/districts.module';
import { WebsiteoptionsModule } from './websiteoptions/websiteoptions.module';
import { PhonebrandsModule } from './phonebrands/phonebrands.module';
import { PhonemodelsModule } from './phonemodels/phonemodels.module';
import { PhonesituationsModule } from './phonesituations/phonesituations.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PhonequestionModule } from './phonequestion/phonequestion.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';





@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AdminsModule,
    CitiesModule,
    CountriesModule,
    CustomersModule,
    DistrictsModule,
    WebsiteoptionsModule,
    PhonebrandsModule,
    PhonemodelsModule,
    PhonesituationsModule,
    DashboardModule,
    PhonequestionModule,
    

  ],
  exports:[
  ]
})
export class ComponentsModule { }
