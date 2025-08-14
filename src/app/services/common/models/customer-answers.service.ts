import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateCustomerAnswers } from 'src/app/contracts/create-customer-answers';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAnswersService {

  constructor(private httpClientService : HttpClientService) { }


  async create(customerAnswers : CreateCustomerAnswers) : Promise<CreateCustomerAnswers>{
    const observable : Observable<CreateCustomerAnswers> = this.httpClientService.post<CreateCustomerAnswers>({
      controller : "CustomerAnswers"
    },customerAnswers);
    return await firstValueFrom(observable) as CreateCustomerAnswers;
  }
}
