import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateShippingCompany } from 'src/app/contracts/create-shipping-company';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-shippingcompanies',
  templateUrl: './shippingcompanies.component.html',
  styleUrls: ['./shippingcompanies.component.scss']
})
export class ShippingcompaniesComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService) {
    super(spinner)
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }
  @ViewChild(ListComponent) listComponents : ListComponent
  createdCompany(createdCompany : CreateShippingCompany){
    this.listComponents.getCompanies();
  }

}
