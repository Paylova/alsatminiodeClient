import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListPhoneCost } from 'src/app/contracts/list-phone-cost';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PhonecostService {

  constructor(private httpClientService : HttpClientService) { }


  async getPhoneCost(id : string) : Promise<{phoneCost : ListPhoneCost[]}>{
    const promiseData : Promise<{phoneCost : ListPhoneCost[]}> = 
    this.httpClientService.get<{phoneCost : ListPhoneCost[]}>({
      controller : "PhoneCost"
    },id).toPromise();
    return await promiseData;
  }

  async getByIdPhoneCost(id : string) : Promise<{phoneCost : ListPhoneCost}>{
    const promiseData : Promise<{phoneCost : ListPhoneCost}> = 
    this.httpClientService.get<{phoneCost : ListPhoneCost}>({
      controller : "GetSinglePhoneCost",
      
    },id).toPromise();
    return await promiseData;
  }


  async updatePhoneCost(id : string, phoneCost : number,successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.put({
      controller : "PhoneCost"
    },{
      id,
      phoneCost
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
