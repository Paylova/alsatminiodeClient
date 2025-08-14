import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEmail } from '../contracts/create-email';
import { HttpClientService } from './common/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClientService : HttpClientService) { }


  sendEmail(requestMail : CreateEmail, successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.post({
      controller : "Email",
      action : "Send"
    },requestMail).subscribe(result => {
      successCallBack();
    }, (errorResponse : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string> }> = errorResponse.error;
    let message = "";
    _error.forEach((v,index)=> {
      v.value.forEach((_v,_index) => {
        message += `${_v}<br>`;
      });
    });
    errorCallBack(message);
  })
  }
}
