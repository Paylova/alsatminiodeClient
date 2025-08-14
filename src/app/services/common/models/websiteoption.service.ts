import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateWebsiteOption } from 'src/app/contracts/create-website-option';
import { ListWebsiteOption } from 'src/app/contracts/list-website-option';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteoptionService {

  constructor(private httpClientService : HttpClientService) { }

  createOption(option : CreateWebsiteOption, successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.post({
      controller : "WebsiteOption"
    },option).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string>}> = errorResponse.error;
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index)=> {
        message += `${_v}<br>`;
      });
    });
    errorCallBack(message); 
  });
  }


  async listOption(page : number = 0, size : number = 5, successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void ) : 
  Promise<{totalCount : number, option : ListWebsiteOption[]}>{
    const promiseData : Promise<{totalCount : number, option : ListWebsiteOption[]}> =
    this.httpClientService.get<{totalCount : number, option : ListWebsiteOption[]}>({
      controller : "WebsiteOption",
      queryString : `page=${page}&size=${size}`
    }).toPromise();
    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData;
  }

  async GetByIdOption(id : string) :Promise<{websiteOption : ListWebsiteOption}> {
    const promiseData : Promise<{websiteOption : ListWebsiteOption}>=
    this.httpClientService.get<{websiteOption : ListWebsiteOption}>({
      controller : "WebsiteOption"
    },id).toPromise();
    return await promiseData;
  }

  async updateWebsiteOption(id : string, mailHost : string, mailUsername : string, mailPassword : string,mailPort : string, mailReplyMail : string, giftCouponRate : number,successCallBack? : () => void, errorCallBack? :(errorMesage:string) => void){
    this.httpClientService.put({
      controller : "WebsiteOption"
    },{
      id,
      mailHost,
      mailUsername,
      mailPassword,
      mailPort,
      mailReplyMail,
      giftCouponRate
    }).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string>}> = errorResponse.error;
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index) => {
        message += `${_v}<br>`;
      });
    });
    errorCallBack(message);
  });
  }





}


