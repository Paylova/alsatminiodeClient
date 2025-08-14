import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePhoneModel } from 'src/app/contracts/create-phone-model';
import { ListPhoneModel } from 'src/app/contracts/list-phone-model';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ListPhoneModelImage } from 'src/app/contracts/list-phone-model-image';

@Injectable({
  providedIn: 'root'
})
export class PhonemodelService {

  constructor(private httpClientService : HttpClientService) { }

  createPhoneModel(phoneModel : CreatePhoneModel, successCallBack? : () => void, errorCallBack? : (errorMesage:string) 
  => void){
    this.httpClientService.post({
      controller: "PhoneModel"
    },phoneModel).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string , value : Array<string>}> = errorResponse.error;
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index) => {
        message += `${_v}<br>`;
      });
    });
    errorCallBack(message);
  });
  }

  async listPhoneModel(page : number = 0,size : number = 100 ,successCallBack?: () => void, errorCallBack? : (errorMesage : string) => void) :
  Promise<{totalCount : number , phoneModel : ListPhoneModel[]}>{
  const promiseData :Promise<{totalCount : number , phoneModel : ListPhoneModel[]}> =  
   this.httpClientService.get<{totalCount : number , phoneModel : ListPhoneModel[]}>({
     controller : "PhoneModel",
     queryString : `page=${page}&size=${size}`
   }).toPromise();

   promiseData.then(d => successCallBack())
     .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))

   return await promiseData;
 }



 async getModel() : Promise<{phoneModel : ListPhoneModel[]}>{
  const promiseData : Promise<{phoneModel : ListPhoneModel[]}>=
  this.httpClientService.get<{phoneModel : ListPhoneModel[]}>({
    controller : "PhoneModel",
    
  }).toPromise();
  return await promiseData;
 }

 async getModelById(id : string) : Promise<{phoneModel : ListPhoneModel}>{
  const promiseData : Promise<{phoneModel : ListPhoneModel}> =
  this.httpClientService.get<{phoneModel : ListPhoneModel}>({
    controller : "PhoneModel"
  },id).toPromise();
  return await promiseData;
 }

 updatePhoneModel(phoneModel : ListPhoneModel, successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
  this.httpClientService.put({
    controller : "PhoneModel"
  },phoneModel).subscribe(result => {
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
    controller : "PhoneModel"
  }, id);
  await firstValueFrom(deleteObs);
}

 async readImages(id : string) : Promise<ListPhoneModelImage[]> {
  const getObservable : Observable<ListPhoneModelImage[]> = this.httpClientService.get<ListPhoneModelImage[]>({
    action : "GetPhoneModelImages",
    controller : "PhoneModel"
  },id);
  return await firstValueFrom(getObservable);
}

async deleteImage(id : string, imageId : string, successCallBack? : () => void){
  const deleteObservable = this.httpClientService.delete({
    action : "DeletePhoneModelImages",
    controller : "PhoneModel",
    queryString : `imageId=${imageId}`
  },id)
  await firstValueFrom(deleteObservable);
  successCallBack();
}

async getPhoneModelForBrand(id : string) : Promise<{phoneModel : ListPhoneModel[]}>{
  const promiseData : Promise<{phoneModel : ListPhoneModel[]}> =
  this.httpClientService.get<{phoneModel : ListPhoneModel[]}>({
    controller : "PhoneModelForBrand"
  },id).toPromise();
  return await promiseData;
}






}
