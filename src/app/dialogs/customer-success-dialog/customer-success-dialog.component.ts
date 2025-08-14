import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ListShippingCompany } from 'src/app/contracts/list-shipping-company';
import { ShippingcompanyService } from 'src/app/services/common/models/shippingcompany.service';

@Component({
  selector: 'app-customer-success-dialog',
  templateUrl: './customer-success-dialog.component.html',
  styleUrls: ['./customer-success-dialog.component.scss']
})
export class CustomerSuccessDialogComponent implements OnInit, OnDestroy {
  referanceCode:number = 0;
  customerShippingCompanyId : string;
  shippingCompanyName : ListShippingCompany;
  shippingCompanyDealCode : ListShippingCompany;

  constructor(private shippingCompanyService : ShippingcompanyService) { }

    async getSingleShippingCompany(id : string){
    id = this.customerShippingCompanyId;
    const getSingle : {shippingCompany : ListShippingCompany} = await this.shippingCompanyService.getModelById(id);
    this.shippingCompanyName = getSingle.shippingCompany[0].companyName;
    this.shippingCompanyDealCode = getSingle.shippingCompany[0].companyDealCode;
    return getSingle;
  }


 
 

  ngOnDestroy(): void {
    localStorage.removeItem('referanceCode')
    localStorage.removeItem('shippingCompanyId')
  }

  async ngOnInit() {
    //this.loadShippingCompanyId();
    //await this.getSingleShippingCompany("");
    this.loadReferanceCode();
  }

  loadReferanceCode(){
    let referanceCode = Number(localStorage.getItem('referanceCode'));
    if(referanceCode){
      this.referanceCode = referanceCode;
    }
  }
  loadShippingCompanyId(){
    this.customerShippingCompanyId = String(localStorage.getItem('shippingCompanyId'));
  }
  isDisabled : boolean = false;
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.isDisabled = true;
    }
}

}
