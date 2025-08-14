import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from './common/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class GsmService {

  constructor(private httpClientService : HttpClientService) { }

  sendSMS(customerGSM : string,message : string,successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.post({
      fullEndPoint : `https://api.netgsm.com.tr/sms/send/get?usercode=8503089920&password=n3-74761&gsmno=${customerGSM}&message=${message}&msgheader=EMPEROR&dil=TR`,   
    },"").subscribe(result => {
      successCallBack();
    }, (errorResponse : HttpErrorResponse) => {const _error : Array<{key : string,value : Array<string>}> = errorResponse.error;
  let message = "";
  _error.forEach((v,index) => {
    v.value.forEach((_v,_index) => {
      message += `${_v}<br>`;
    });
  })
  errorCallBack(message)
  });
  }
}
