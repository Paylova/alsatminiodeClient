import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateShippingCompany } from 'src/app/contracts/create-shipping-company';
import { ListShippingCompany } from 'src/app/contracts/list-shipping-company';
import { ListShippingCompanyImageFile } from 'src/app/contracts/list-shipping-company-image-file';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingcompanyService {

  constructor(private httpClientService : HttpClientService) { }

  createCompany(shippingCompany : CreateShippingCompany, successCallBack? : () => void, errorCallBack? : (errorMesage:string)=> void){
    this.httpClientService.post({
      controller : "ShippingCompany"
    },shippingCompany).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string>}> = errorResponse.error
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index) => {
        message += `${_v}<br>`
      });
    });
  })
  }

  async listCompany(page : number = 0, size : number = 5, successCallBack? : () => void,errorCallBack? : (errorMesage:string) => void) : 
  Promise<{totalCount : number, shippingCompany : ListShippingCompany[]}>{
    const promiseData : Promise<{totalCount : number, shippingCompany : ListShippingCompany[]}> = this.httpClientService.get<{totalCount : number, shippingCompany : ListShippingCompany[]}>({
      controller : "ShippingCompany",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData;

  }

  async getCompany() : Promise<{shippingCompany : ListShippingCompany[]}>{
    const promiseData : Promise<{shippingCompany : ListShippingCompany[]}> =
    this.httpClientService.get<{shippingCompany : ListShippingCompany[]}>({
      controller : "ShippingCompany",
    }).toPromise();
    return await promiseData;
  }

  async getModelById(id : string) : Promise<{shippingCompany : ListShippingCompany}>{
    const promiseData : Promise<{shippingCompany : ListShippingCompany}> =
    this.httpClientService.get<{shippingCompany : ListShippingCompany}>({
      controller : "ShippingCompany"
    },id).toPromise();
    return await promiseData;
   }

   async readImages(id : string) : Promise<ListShippingCompanyImageFile[]> {
    const getObservable : Observable<ListShippingCompanyImageFile[]> = this.httpClientService.get<ListShippingCompanyImageFile[]>({
      action : "GetShippingCompanyImageFile",
      controller : "ShippingCompany"
    },id);
    return await firstValueFrom(getObservable);
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "DeleteShippingCompanyImageFile",
      controller: "ShippingCompany",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}
