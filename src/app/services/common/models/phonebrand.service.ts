import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreatePhoneBrand } from 'src/app/contracts/create-phone-brand';
import { ListPhoneBrand } from 'src/app/contracts/list-phone-brand';
import { ListPhoneBrandImage } from 'src/app/contracts/list-phone-brand-image';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PhonebrandService {

  constructor(private httpClientservice : HttpClientService) { }

  createPhoneBrand(phoneBrand : CreatePhoneBrand, successCallBack? : () => void, errorCallBack? : (errorMesage:string) 
  => void){
    this.httpClientservice.post({
      controller : "PhoneBrand"
    },phoneBrand).subscribe(result => {
      successCallBack();
    }, (errorResponse : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string>}> = errorResponse.error
    let message = "";
    _error.forEach((v,index) => {
      v.value.forEach((_v,_index) => {
        message += `${_v}<br>`;
      });
    });
    errorCallBack(message);
  });  
  }


  async listPhoneBrand(page : number = 0, size : number = 5, successCallBack? : () => void,errorCallBack? : (errorMesage:string) => void) : 
  Promise<{totalCount : number, phoneBrand : ListPhoneBrand[]}>{
    const promiseData : Promise<{totalCount : number, phoneBrand : ListPhoneBrand[]}> = this.httpClientservice.get<{totalCount : number, phoneBrand : ListPhoneBrand[]}>({
      controller : "PhoneBrand",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData;

  }
  async getBrand() : Promise<{phoneBrand : ListPhoneBrand[]}>{
    const promiseData : Promise<{phoneBrand : ListPhoneBrand[]}> =
    this.httpClientservice.get<{phoneBrand : ListPhoneBrand[]}>({
      controller : "PhoneBrand",
    }).toPromise();
    return await promiseData;
  }



  async getSingleBrand(id : string) : Promise<{phoneBrand : ListPhoneBrand}>{
    const promiseData : Promise<{phoneBrand : ListPhoneBrand}> =
    this.httpClientservice.get<{phoneBrand : ListPhoneBrand}>({
      controller : "PhoneBrand",
    },id).toPromise();
    return await promiseData;
    
  }

  async deletePhoneBrand(id : string){
    const deleteObs : Observable<any> = this.httpClientservice.delete<any>({
      controller : "PhoneBrand"
    },id)
    await firstValueFrom(deleteObs)
  }

  async readImages(id :string) : Promise<ListPhoneBrandImage[]>{
    const getObservable : Observable<ListPhoneBrandImage[]> = this.httpClientservice.get<ListPhoneBrandImage[]>({
      action : "GetPhoneBrandImages",
      controller : "PhoneBrand"
    },id);
    return await firstValueFrom(getObservable);
  }
  
  async readSingleImage(id :string) : Promise<{image : ListPhoneBrandImage}>{
    const promiseData : Promise<{image : ListPhoneBrandImage}> = 
    this.httpClientservice.get<{image : ListPhoneBrandImage}>({
      action : "GetSinglePhoneBrandImage",
      controller : "GetSinglePhoneBrandController"
    },id).toPromise();
    return await promiseData;
  }

  async deleteImage(id:string,imageId : string, successCallBack? :() => void){
    const deleteObservable = this.httpClientservice.delete({
      action : "DeletePhoneBrandImages",
      controller : "PhoneBrand",
      queryString : `imageId=${imageId}`
    },id);

    await firstValueFrom(deleteObservable);
    successCallBack();
  }




}



