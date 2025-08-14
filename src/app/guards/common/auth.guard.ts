import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelpler : JwtHelperService,private router : Router,private alertifyService : AlertifyService,private spinner : NgxSpinnerService){

  }

  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.ballBeat);
    const token : string = localStorage.getItem("accessToken");
    const decodeToken = this.jwtHelpler.decodeToken(token);
    const expirationDate : Date = this.jwtHelpler.getTokenExpirationDate(token);
    let expired : boolean;
    try {
      expired = this.jwtHelpler.isTokenExpired(token);
    } catch (error) {
      expired = true;
    }
    if(!token || expired){
      this.router.navigate(["alsatminiode-login"]);
      this.alertifyService.message("Oturum Açmanız gerekiyor !!",{
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      })
    }
    this.spinner.hide(SpinnerType.ballBeat);
    return true;
  }
  
}
