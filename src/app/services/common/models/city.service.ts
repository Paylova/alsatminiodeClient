import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCity } from 'src/app/contracts/create-city';
import { ListCity } from 'src/app/contracts/list-city';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClientService : HttpClientService) { }

  createCity(city : CreateCity, successCallBack? : () => void, errorCallBack? : (errorMesage:string) 
  => void){
    this.httpClientService.post({
      controller : "City"
    },city).subscribe(result => {
      successCallBack();
    },(errorRespose : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string>}> = errorRespose.error;
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index) => {
        message += `${_v}<br>`;
      });
    });
    errorCallBack(message);
  });
  }

  async listCity(page : number=0, size : number = 5, successCallBack? : () => void, errorCallBack? : (errorMesage:string)
  => void) : Promise<{totalCount : number, city : ListCity[]}>{
    const promiseData : Promise<{totalCount : number, city : ListCity[]}> = this.httpClientService.get<{totalCount : number, city :ListCity[]}>({
      controller : "City",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getCity() : Promise<{city : ListCity[]}>{
    const promiseData : Promise<{city : ListCity[]}>=
    this.httpClientService.get<{city : ListCity[]}>({
      controller : "City"
    }).toPromise();

    return await promiseData;
  }
  async getSingleCity(id : string) : Promise<{city : ListCity}>{
    const promiseData : Promise<{city : ListCity}>=
    this.httpClientService.get<{city : ListCity}>({
      controller : "City"
    },id).toPromise();
    return await promiseData;
  }

  updateCity(city : CreateCity,successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.put({
      controller : "City"
    },city).subscribe(result => {
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





