import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCustomer } from 'src/app/contracts/list-customer';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { CustomerService } from 'src/app/services/common/models/customer.service';

declare var $ : any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  listOfCustomers : Array<ListCustomer> = [];

  constructor(spinner : NgxSpinnerService,private customerService : CustomerService,private alertifyService : AlertifyService) {
    super(spinner);
   }

   async getCustomer(){
    const allCustomers : {customer : ListCustomer[]} = await this.customerService.getCustomers();
    this.listOfCustomers = allCustomers.customer;
    return this.listOfCustomers;
   }




  async ngOnInit() {
    this.showSpinner(SpinnerType.ballBeat);
    this.getCustomer()
    let date = new Date();
    // add a day
    date.setDate(date.getDate()-1);  
  }
  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}

}


