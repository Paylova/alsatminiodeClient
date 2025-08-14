import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateDistrict } from 'src/app/contracts/create-district';
import { ListDistrict } from 'src/app/contracts/list-district';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private httpClientService : HttpClientService) { }


  createDistrict(district : CreateDistrict, successCallBack? : () => void, errorCallBack? : (errorMesage:string) 
  => void){
    this.httpClientService.post({
      controller : "District"
    },district).subscribe(result => {
      successCallBack();
    }, (errorResponse : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string>}> = errorResponse.error;
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index) => {
        message += `${_v}<br>`;
      });
    });
    errorCallBack(message);
  });
  }

  async listDistrict(page : number = 0, size : number = 5,successCallBack? : () => void,errorCallBack? : (errorMesage:string) => void) : 
  Promise<{totalCount : number, district : ListDistrict[]}> {
    const promiseData : Promise<{totalCount : number, district : ListDistrict[]}> = this.httpClientService.get<{totalCount : number, district : ListDistrict[]}>({
      controller : "District",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message));
      return await promiseData;
  }
}

