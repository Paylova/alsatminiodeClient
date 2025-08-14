import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './alsatminiode-admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './alsatminiode-admin/layout/layout.component';
import { AlsatminiodeLoginComponent } from './alsatminiode-login/alsatminiode-login.component';
import { CihazinidegerlendirComponent } from './alsatminiode-ui/components/cihazinidegerlendir/cihazinidegerlendir.component';
import { HakkimizdaComponent } from './alsatminiode-ui/components/hakkimizda/hakkimizda.component';
import { HomeComponent } from './alsatminiode-ui/components/home/home.component';
import { IletisimComponent } from './alsatminiode-ui/components/iletisim/iletisim.component';
import { SorularComponent } from './alsatminiode-ui/components/sorular/sorular.component';
import { TelefonSatComponent } from './alsatminiode-ui/components/telefon-sat/telefon-sat.component';
import { YakindaComponent } from './alsatminiode-ui/components/yakinda/yakinda.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {
    path: "alsatminiode-admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "admins", loadChildren: () => import("./alsatminiode-admin/components/admins/admins.module").then(module => module.AdminsModule) },
      { path: "cities", loadChildren: () => import("./alsatminiode-admin/components/cities/cities.module").then(module => module.CitiesModule) },
      { path: "countries", loadChildren: () => import("./alsatminiode-admin/components/countries/countries.module").then(module => module.CountriesModule) },
      { path: "customers", loadChildren: () => import("./alsatminiode-admin/components/customers/customers.module").then(module => module.CustomersModule) },
      { path: "districts", loadChildren: () => import("./alsatminiode-admin/components/districts/districts.module").then(module => module.DistrictsModule) },
      { path: "phonebrands", loadChildren: () => import("./alsatminiode-admin/components/phonebrands/phonebrands.module").then(module => module.PhonebrandsModule) },
      { path: "phonemodels", loadChildren: () => import("./alsatminiode-admin/components/phonemodels/phonemodels.module").then(module => module.PhonemodelsModule) },
      { path: "phonequestion", loadChildren: () => import("./alsatminiode-admin/components/phonequestion/phonequestion.module").then(module => module.PhonequestionModule) },
      { path: "phonesituations", loadChildren: () => import("./alsatminiode-admin/components/phonesituations/phonesituations.module").then(module => module.PhonesituationsModule) },
      { path: "websiteoptions", loadChildren: () => import("./alsatminiode-admin/components/websiteoptions/websiteoptions.module").then(module => module.WebsiteoptionsModule) },
      { path : "phonemodelcapacity", loadChildren : () => import("./alsatminiode-admin/components/phonemodelcapacity/phonemodelcapacity.module").then(module => module.PhonemodelcapacityModule)},
      { path : "shippingcompanies", loadChildren : () => import("./alsatminiode-admin/components/shippingcompanies/shippingcompanies.module").then(module => module.ShippingcompaniesModule)}
    ], canActivate: [AuthGuard]
  },
  { path: "", component: HomeComponent },
  { path : "telefon-sat", component: TelefonSatComponent},
  { path: "alsatminiode-login", component: AlsatminiodeLoginComponent },
  { path : "cihazinidegerlendir", component: CihazinidegerlendirComponent},
  { path : "yakinda", component: YakindaComponent},
  { path : "hakkimizda", component: HakkimizdaComponent},
  { path : "iletisim", component: IletisimComponent},
  { path : "sorular", component: SorularComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
