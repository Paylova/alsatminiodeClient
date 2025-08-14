import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from 'src/app/contracts/create-user';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { User } from 'src/app/entities/user';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService,private alertifyService : AlertifyService) { }

  async create (user : User) : Promise<CreateUser> {
    const observable : Observable<CreateUser | User> =  this.httpClientService.post<CreateUser | User>({
      controller : "User",
    },user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async login (userNameOrEmail : string, password : string,callbackFunction? : () => void) : Promise<any> {
    const observable : Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller : "User",
      action : "Login"
    },{
      userNameOrEmail,password
    })
    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      this.alertifyService.message("Giriş Başarılı",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
    }
      
    callbackFunction();
  }
}
