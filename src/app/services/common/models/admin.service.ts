import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateAdmin } from 'src/app/contracts/create-admin';
import { ListAdmin } from 'src/app/contracts/list-admin';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClientService : HttpClientService) {  }

  createAdmin(admin : CreateAdmin, successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.post({
      controller : "Admin"
    },admin).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string, value : Array<string>}> =errorResponse.error;
      let message = "";
      _error.forEach((v, index) =>{
        v.value.forEach((_v,_index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
  });
  }

  
  async listAdmin(page : number = 0, size : number = 5,successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void) : 
  Promise<{totalCount : number, admin : ListAdmin[]}>{
    const promiseData : Promise<{totalCount : number, admin : ListAdmin[]}> =
    this.httpClientService.get<{totalCount : number, admin : ListAdmin[]}>({
      controller : "Admin",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }


  async deleteAdmin(id : string){
    const deleteObs : Observable<any> = this.httpClientService.delete<any>({
      controller : "Admin"
    },id)
    await firstValueFrom(deleteObs)
  }


}


