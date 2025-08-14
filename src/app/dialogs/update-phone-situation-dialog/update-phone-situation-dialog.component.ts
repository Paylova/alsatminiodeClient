import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCustomer } from 'src/app/contracts/create-customer';
import { ListPhoneSituation } from 'src/app/contracts/list-phone-situation';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CustomerService } from 'src/app/services/common/models/customer.service';
import { PhonesituationService } from 'src/app/services/common/models/phonesituation.service';

@Component({
  selector: 'app-update-phone-situation-dialog',
  templateUrl: './update-phone-situation-dialog.component.html',
  styleUrls: ['./update-phone-situation-dialog.component.scss']
})
export class UpdatePhoneSituationDialogComponent extends BaseComponent implements OnInit {
  listOfPhoneSituations : Array<ListPhoneSituation> = null;
  defaultSituation : string;
  phoneSituationId : string;
  constructor(spinner : NgxSpinnerService, private phoneSituationService : PhonesituationService,
    private customerService : CustomerService,
    @Inject(MAT_DIALOG_DATA) public data : string, private alertifyService : AlertifyService,
    ) {
    super(spinner)

   }


  async getSituations(){
    const allSituations : {phoneSituation : ListPhoneSituation[]} = await this.phoneSituationService.getSituations();
    this.listOfPhoneSituations = allSituations.phoneSituation;
    this.defaultSituation = this.listOfPhoneSituations[0].phoneSituation;
   }
   onNgModelChange(event){
    this.phoneSituationId = event.id;
    
   }
  async ngOnInit() {
    await this.getSituations();
  }
  updateSituation(){
    this.showSpinner(SpinnerType.ballBeat);
    const update_customer : CreateCustomer = new CreateCustomer();
    update_customer.id = this.data;
    update_customer.customerPhoneSituation = this.phoneSituationId;
    this.customerService.updateCustomer(update_customer,()=> {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message("Bilgileriniz Güncellendi ! ",{
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
      });
    });

  }

}
