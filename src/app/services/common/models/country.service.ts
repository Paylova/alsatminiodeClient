import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCountry } from 'src/app/contracts/create-country';
import { ListCountry } from 'src/app/contracts/list-country';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClientService : HttpClientService) { }

  createCountry(country : CreateCountry, successCallBack? :() => void, errorCallBack? : (errorMesage:string)
   => void ){
    this.httpClientService.post({
      controller : "Country"
    },country).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string,value : Array<string>}> = errorResponse.error;
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index) =>{
        message += `${_v}<br>`;
      });
    });
    errorCallBack(message);
  });
  }


  async listCountry(page : number = 0 , size : number = 5, successCallBack? : () => void, errorCallBack? : (errorMesage : string) => void ) : 
  Promise<{totalCount : number, country : ListCountry[]}>{
    const promiseData : Promise<{totalCount : number, country : ListCountry[]}> = this.httpClientService.get<{totalCount : number, country :ListCountry[]}>({
      controller : "Country",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData;
  }

  async getCountry() : Promise<{country : ListCountry[]}>{
    const promiseData : Promise<{country : ListCountry[]}>=
    this.httpClientService.get<{country : ListCountry[]}>({
      controller : "Country"
    }).toPromise();

    return await promiseData;
  }

  async getByIdCountry(id : string) : Promise<{country : ListCountry}>{
    const promiseData : Promise<{country : ListCountry}>=
    this.httpClientService.get<{country : ListCountry}>({
      controller : "Country"
    },id).toPromise();
    return await promiseData;
  }
  updateCountry(country : ListCountry,successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.put({
      controller : "Country"
    },country).subscribe(result => {
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
