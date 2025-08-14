import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateCustomer } from 'src/app/contracts/create-customer';
import { ListCustomer } from 'src/app/contracts/list-customer';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClientService : HttpClientService) { }

  async create(customer : CreateCustomer) : Promise<CreateCustomer>{
    const observable : Observable<CreateCustomer> = this.httpClientService.post<CreateCustomer>({
      controller : "Customer"
    },customer);

    return await firstValueFrom(observable) as CreateCustomer;
  }
  async listCustomers(page : number = 0, size : number = 20, successCallBack? : ()=> void,errorCallBack? : (errorMessage:string) => void ):
  Promise<{totalCount : number, customer : ListCustomer[]}>{
    const promiseData : Promise<{totalCount : number , customer : ListCustomer[]}> = this.httpClientService.get<{totalCount : number, customer : ListCustomer[]}>({
      controller : "Customer",
      queryString : `page=${page}&size=${size}`
    }).toPromise();
    promiseData.then(d => successCallBack())
    .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData;

  }
  async getCustomers() : Promise<{customer : ListCustomer[]}>{
    const promiseData : Promise<{customer : ListCustomer[]}>=
    this.httpClientService.get<{customer : ListCustomer[]}>({
      controller : "Customer"
    }).toPromise();
    return await promiseData;
  }
  async getByIdCustomer(id : string) : Promise<{customer : ListCustomer}>{
    const promiseData : Promise<{customer : ListCustomer}>=
    this.httpClientService.get<{customer : ListCustomer}>({
      controller : "Customer"
    },id).toPromise();
    return await promiseData;
  }

  async createCustomer(customer : CreateCustomer, successCallBack? : ()=> void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.post({
      controller : "Customer",
    },customer).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string,value : Array<string>}> = errorResponse.error;
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index)=> {
        message += `${_v}<br>`;
      });
    });
    errorCallBack(message); 
  });

     
  }

  async updateCustomer(customer : CreateCustomer, successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.put({
      controller : "Customer"
    },customer).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string>}> = errorResponse.error
    let message = "";
    _error.forEach((v,index)=> {
      v.value .forEach((_v,_index)=> {
        message += `${_v}<br>`
      });
    });
    errorCallBack(message);
  });
  }
  async updateCustomerSMS(customer : CreateCustomer, successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.put({
      controller : "SendGSMCustomer",
    },customer).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string>}> = errorResponse.error
    let message = "";
    _error.forEach((v,index)=> {
      v.value .forEach((_v,_index)=> {
        message += `${_v}<br>`
      });
    });
    errorCallBack(message);
  });
  }

}

