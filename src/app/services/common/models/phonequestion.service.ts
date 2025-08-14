import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreatePhoneQuestion } from 'src/app/contracts/create-phone-question';
import { ListPhoneQuestion } from 'src/app/contracts/list-phone-question';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PhonequestionService {

  constructor(private httpClientService: HttpClientService) { }
  
  createPhoneQuestion(phonequestion : CreatePhoneQuestion, successCallBack? : () => void,errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.post({
      controller : "PhoneQuestions"
    },phonequestion).subscribe(result => {
      successCallBack();
    },(errorResponse : HttpErrorResponse) => {const _error : Array<{key : string , value : Array<string>}> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v,_index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async listPhoneQuestion(page : number = 0,size : number = 5 ,successCallBack?: () => void, errorCallBack? : (errorMesage : string) => void) :
   Promise<{totalCount : number , phonequestion : ListPhoneQuestion[]}>{
   const promiseData :Promise<{totalCount : number , phonequestion : ListPhoneQuestion[]}> =  
    this.httpClientService.get<{totalCount : number , phonequestion : ListPhoneQuestion[]}>({
      controller : "PhoneQuestions",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async getPhoneQuestion() : Promise<{phonequestion : ListPhoneQuestion[]}>{
    const promiseData : Promise<{phonequestion : ListPhoneQuestion[]}> =
      this.httpClientService.get<{phonequestion : ListPhoneQuestion[]}>({
        controller : "PhoneQuestions",
      }).toPromise();

      return await promiseData;
  }


  async deletePhoneQuestion(id : string){
    const deleteObs : Observable<any> = this.httpClientService.delete<any>({
      controller : "PhoneQuestions"
    }, id);
    await firstValueFrom(deleteObs);
  }

  updateQuestion(phoneQuestion : ListPhoneQuestion,successCallBack? : () => void, errorCallBack? : (errorMesage:string) => void){
    this.httpClientService.put({
      controller : "PhoneQuestions"
    },phoneQuestion).subscribe(result => {
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

  async getByIdQuestion(id : string) : Promise<{phoneQuestion : ListPhoneQuestion}>{
    const promiseData : Promise<{phoneQuestion : ListPhoneQuestion}>=
    this.httpClientService.get<{phoneQuestion : ListPhoneQuestion}>({
      controller : "PhoneQuestions"
    },id).toPromise();
    return await promiseData;
  }

  

  
  









  
}
