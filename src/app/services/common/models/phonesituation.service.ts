import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreatePhoneSituation } from 'src/app/contracts/create-phone-situation';
import { ListPhoneSituation } from 'src/app/contracts/list-phone-situation';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PhonesituationService {

  constructor(private httpClientService : HttpClientService) { }

  createPhoneSituation(phoneSituation : CreatePhoneSituation, successCallBack? : ()=> void,errorCallBack? : (errorMesage : string)
   => void){
    this.httpClientService.post({
      controller : "PhoneSituation"
    },phoneSituation).subscribe(result => {
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



  async listPhoneSituation (page : number = 0 , size : number = 5,successCallBack? : () => void,errorCallBack? : (errorMesage : string) => void) :
  Promise<{totalCount : number , phoneSituation : ListPhoneSituation[]}> {
    const promiseData : Promise<{totalCount : number , phoneSituation : ListPhoneSituation[]}> = this.httpClientService.get<{totalCount : number, phoneSituation : ListPhoneSituation[]}>({
      controller : "PhoneSituation",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))
      return await promiseData;
  }

  async deleteSituation(id : string){
    const deleteObs : Observable<any> = this.httpClientService.delete<any>({
      controller : "PhoneSituation"
    },id);
    await firstValueFrom(deleteObs); 
  }

  async getSituations() : Promise<{phoneSituation : ListPhoneSituation[]}>{
    const promiseData : Promise<{phoneSituation : ListPhoneSituation[]}>=
    this.httpClientService.get<{phoneSituation : ListPhoneSituation[]}>({
      controller : "PhoneSituation"
    }).toPromise();
    return await promiseData;
  }
}





