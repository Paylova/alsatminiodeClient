import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateShippingCompany } from 'src/app/contracts/create-shipping-company';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ShippingcompanyService } from 'src/app/services/common/models/shippingcompany.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private shippingCompanyService : ShippingcompanyService, private alertifyService : AlertifyService) { 
    super(spinner)
  }

  ngOnInit(): void {
  }
  @Output() createdCompany : EventEmitter<CreateShippingCompany> = new EventEmitter();
  create(companyName : HTMLInputElement,companyDealCode : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const create_company : CreateShippingCompany = new CreateShippingCompany();
    create_company.companyName = companyName.value;
    create_company.companyDealCode = companyDealCode.value;
    this.shippingCompanyService.createCompany(create_company, ()=> {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message("Kargo Firması Başarıyla eklenmiştir",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdCompany.emit(create_company);
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message("Kargo firması eklenirken bir hata oluştu.",{
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      })
    })
  }

}
