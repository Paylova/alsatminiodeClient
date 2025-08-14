import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListPhoneModelCapacity } from 'src/app/contracts/list-phone-model-capacity';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { PhonemodelcapacityService } from 'src/app/services/common/models/phonemodelcapacity.service';

@Component({
  selector: 'app-update-phone-model-capacity',
  templateUrl: './update-phone-model-capacity.component.html',
  styleUrls: ['./update-phone-model-capacity.component.scss']
})
export class UpdatePhoneModelCapacityComponent extends BaseComponent implements OnInit {

  modelName : ListPhoneModelCapacity;
  capacityPrice : ListPhoneModelCapacity;



  constructor(spinner : NgxSpinnerService,
    private phoneModelCapacityservice : PhonemodelcapacityService,
    @Inject(MAT_DIALOG_DATA) public data : string,
    private alertifyService : AlertifyService) {
    super(spinner)
   }


  async getSingle(id : string){
    id = this.data;
    const getSingle : {phoneModelCapacity : ListPhoneModelCapacity} = await this.phoneModelCapacityservice.getPhoneModelCapacityById(id);
    this.modelName = getSingle.phoneModelCapacity[0].phoneModelCapacityName;
    this.capacityPrice = getSingle.phoneModelCapacity[0].phoneModelCapacityPrice;
    return getSingle;
  }

  async updateModel(phoneModelCapacityName : HTMLInputElement, phoneModelCapacityPrice : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const update_phonemodelcapacity : ListPhoneModelCapacity = new ListPhoneModelCapacity();
    update_phonemodelcapacity.id = this.data;
    //update_phonemodelcapacity.phoneModel = this.phoneModelId;
    update_phonemodelcapacity.phoneModelCapacityName = phoneModelCapacityName.value;
    update_phonemodelcapacity.phoneModelCapacityPrice = parseInt(phoneModelCapacityPrice.value);

    this.phoneModelCapacityservice.updatePhoneModelCapacity(update_phonemodelcapacity, ()=>{
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message("Bilgileriniz Güncellendi",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
    }, errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertifyService.message(errorMesage, {
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      });
    })
  }

  async ngOnInit() {
   await this.getSingle("");
  }

}
