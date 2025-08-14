import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CreatePhoneModelCapacity } from 'src/app/contracts/create-phone-model-capacity';
import { ListPhoneModelCapacity } from 'src/app/contracts/list-phone-model-capacity';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PhonemodelcapacityService {

  constructor(private httpClientService : HttpClientService) { }

  createPhoneModelCapacity(phoneModelCapacity : CreatePhoneModelCapacity, successCallBack? : () => void, errorCallBack? : (errorMesage:string)
  => void){
    this.httpClientService.post({
      controller : "PhoneModelCapacity"
    },phoneModelCapacity).subscribe(result =>{
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error :  Array<{key : string, value : Array<string>}> = errorResponse.error;
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index) => {
        message+= `${_v}<br`;
      });
    });
    errorCallBack(message);
  });
  }
  async listPhoneModelCapacity(page : number = 0 , size : number = 5, successCallBack?: () => void, errorCallBack? : (errorMesage : string) => void ) :
  Promise<{totalCount : number, phoneModelCapacity : ListPhoneModelCapacity[]}>{
    const promiseData : Promise<{totalCount : number, phoneModelCapacity : ListPhoneModelCapacity[]}> =
    this.httpClientService.get<{totalCount : number, phoneModelCapacity : ListPhoneModelCapacity[]}>({
      controller : "PhoneModelCapacity",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async getModel() : Promise<{phoneModelCapacity : ListPhoneModelCapacity[]}>{
    const promiseData : Promise<{phoneModelCapacity : ListPhoneModelCapacity[]}>=
    this.httpClientService.get<{phoneModelCapacity : ListPhoneModelCapacity[]}>({
      controller : "PhoneModelCapacity",
      
    }).toPromise();
    return await promiseData;
   }

   async getPhoneModelCapacityById(id : string) : Promise<{phoneModelCapacity : ListPhoneModelCapacity}>{
    const promiseData : Promise<{phoneModelCapacity : ListPhoneModelCapacity}> =
    this.httpClientService.get<{phoneModelCapacity : ListPhoneModelCapacity}>({
      controller : "PhoneModelCapacity"
    },id).toPromise();
    return await promiseData;
   }
   async getPhoneModelCapacityWithModelId(id : string) : Promise<{phoneModelCapacity : ListPhoneModelCapacity[]}>{
    const promiseData : Promise<{phoneModelCapacity : ListPhoneModelCapacity[]}> =
    this.httpClientService.get<{phoneModelCapacity : ListPhoneModelCapacity[]}>({
      controller : "PhoneModelCapacityWithModel"
    },id).toPromise();
    return await promiseData;
   }

   updatePhoneModelCapacity(phoneModelCapacity : ListPhoneModelCapacity, successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.put({
      controller : "PhoneModelCapacity"
    },phoneModelCapacity).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => { const _error : Array <{key : string, value : Array<string>}> = errorResponse.error;
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index) => {
        message += `${_v}<br>`;
      });
    });
  })
  }
   async deleteModel(id : string){
    const deleteObs : Observable<any> = this.httpClientService.delete<any>({
      controller : "PhoneModelCapacity"
    }, id);
    await firstValueFrom(deleteObs);
  }

}


