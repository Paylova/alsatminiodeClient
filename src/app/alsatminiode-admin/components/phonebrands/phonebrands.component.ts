import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreatePhoneBrand } from 'src/app/contracts/create-phone-brand';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-phonebrands',
  templateUrl: './phonebrands.component.html',
  styleUrls: ['./phonebrands.component.scss']
})
export class PhonebrandsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService) {
    super(spinner)
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }
  @ViewChild(ListComponent) listComponents : ListComponent
  createdBrand(createdBrand : CreatePhoneBrand){
    this.listComponents.getPhoneBrands();
  }

}

