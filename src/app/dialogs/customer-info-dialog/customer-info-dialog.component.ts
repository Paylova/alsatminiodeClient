import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCustomer } from 'src/app/contracts/create-customer';
import { ListCustomer } from 'src/app/contracts/list-customer';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CustomerService } from 'src/app/services/common/models/customer.service';
import { GsmService } from 'src/app/services/gsm.service';
import { SendSmsDialogComponent, SendSmsDialogState } from '../send-sms-dialog/send-sms-dialog.component';

@Component({
  selector: 'app-customer-info-dialog',
  templateUrl: './customer-info-dialog.component.html',
  styleUrls: ['./customer-info-dialog.component.scss']
})
export class CustomerInfoDialogComponent extends BaseComponent implements OnInit {

  customerName : string;
  customerPhoneDescription : ListCustomer;
  customerAddress : ListCustomer;
  customerMail : ListCustomer;
  customerTC : ListCustomer;
  customerIBAN : ListCustomer;
  customerPaymentChoose :ListCustomer;
  customerTotalCost : ListCustomer;
  customerPhoneCost : ListCustomer;
  countryName : ListCustomer;
  cityName : ListCustomer;
  districtName : ListCustomer;
  customerReferenceCode : ListCustomer;
  customerGSM : string;
  didsendCustomerGSM : ListCustomer;


  message : string;
  iconTXT : string;


  constructor(spinner : NgxSpinnerService,
    private customerService : CustomerService,
     @Inject(MAT_DIALOG_DATA) public data : string,
     private alertifyService : AlertifyService,
     private dialogService : DialogService,
     private gsmService : GsmService) {
    super(spinner)
   }

   async getSingleCustomer(id : string){
    id = this.data;
    const getSingle : {customer : ListCustomer}=
    await this.customerService.getByIdCustomer(id);
    this.customerName = getSingle.customer[0].customerName;
    this.customerPhoneDescription = getSingle.customer[0].customerPhoneDescription;
    this.customerAddress = getSingle.customer[0].customerAddress;
    this.customerMail = getSingle.customer[0].customerMail;
    this.customerTC = getSingle.customer[0].customerTC;
    this.customerIBAN = getSingle.customer[0].customerIBAN;
    this.customerPaymentChoose = getSingle.customer[0].customerPaymentChoose;
    this.customerTotalCost = getSingle.customer[0].customerTotalCost;
    this.customerPhoneCost = getSingle.customer[0].customerPhoneCost;
    this.countryName = getSingle.customer[0].countryName;
    this.cityName = getSingle.customer[0].cityName;
    this.districtName = getSingle.customer[0].districtName;
    this.customerReferenceCode = getSingle.customer[0].customerReferenceCode;
    this.customerGSM = getSingle.customer[0].customerGSM;
    this.didsendCustomerGSM = getSingle.customer[0].didsendCustomerGSM;;
   }



  async ngOnInit() {
    await this.getSingleCustomer("");

    if(this.didsendCustomerGSM){
      this.message="SMS Gönderildi";
      this.iconTXT = "check_circle";
     }
     else{
      this.message = "SMS Gönderilmedi"
      this.iconTXT = "highlight_off"
     }
  }
  sendSMS(){
    this.dialogService.openDialog({
      componentType : SendSmsDialogComponent,
      data : SendSmsDialogState.Yes,
      afterClosed : async ()=> {
        this.showSpinner(SpinnerType.ballBeat)
        const update_customer : CreateCustomer = new CreateCustomer();
        update_customer.id = this.data;
        update_customer.didsendCustomerGSM = true;
        update_customer.customerName = this.customerName;
        update_customer.customerGSM = this.customerGSM;
        await this.customerService.updateCustomerSMS(update_customer, ()=> {
          this.hideSpinner(SpinnerType.ballBeat);
          this.alertifyService.message("Kayıt Güncellendi", {
            dismissOthers : true,
            messageType : MessageType.Success,
            position : Position.BottomCenter
          });
        }, errorMesage => {
          this.hideSpinner(SpinnerType.ballBeat)
          this.alertifyService.message(errorMesage,{
            dismissOthers : true,
            messageType : MessageType.Error,
            position : Position.BottomCenter
          })
        })
      }
    })
  }

}
