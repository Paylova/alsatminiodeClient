import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlsatminiodeAdminModule } from './alsatminiode-admin/alsatminiode-admin.module';
import { AlsatminiodeUIModule } from './alsatminiode-ui/alsatminiode-ui.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { AlsatminiodeLoginModule } from './alsatminiode-login/alsatminiode-login.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlsatminiodeAdminModule,
    AlsatminiodeUIModule,
    AlsatminiodeLoginModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:4200","https://alsatminiode.com","alsatminiode.com","alsatminiode","http://alsatminiode.com","https://www.alsatminiode.com"]
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: "baseUrl", useValue: "https://alsatminiode.com/api/api", multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
