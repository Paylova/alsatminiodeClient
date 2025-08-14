import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListPhoneModel } from 'src/app/contracts/list-phone-model';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { PhonemodelService } from 'src/app/services/common/models/phonemodel.service';

@Component({
  selector: 'app-update-phone-model',
  templateUrl: './update-phone-model.component.html',
  styleUrls: ['./update-phone-model.component.scss']
})
export class UpdatePhoneModelComponent extends BaseComponent implements OnInit {

  modelName : ListPhoneModel;
  modelFirstPrice : ListPhoneModel;
  modelLastPrice : ListPhoneModel;

  constructor(spinner : NgxSpinnerService,
    private phonemodelService : PhonemodelService,
    @Inject(MAT_DIALOG_DATA) public data : string,
    private alertifyService : AlertifyService) {
    super(spinner)
   }


  async getsingleModel(id : string){
    id = this.data;
    const getSingle : {phoneModel : ListPhoneModel} = await this.phonemodelService.getModelById(id);
    this.modelName = getSingle.phoneModel[0].modelName;
    this.modelFirstPrice = getSingle.phoneModel[0].modelFirstPrice;
    this.modelLastPrice = getSingle.phoneModel[0].modelLastPrice;
    return getSingle;

  }

  async updateModel(modelNameInput : HTMLInputElement, modelFirstPriceInput : HTMLInputElement, modelLastPriceInput : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const update_phonemodel : ListPhoneModel = new ListPhoneModel();
    update_phonemodel.id = this.data;
    update_phonemodel.modelName = modelNameInput.value;
    update_phonemodel.modelFirstPrice = parseInt(modelFirstPriceInput.value);
    update_phonemodel.modelLastPrice = parseInt(modelLastPriceInput.value);

    this.phonemodelService.updatePhoneModel(update_phonemodel,()=>{
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message("Bilgileriniz Güncellendi !",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertifyService.message(errorMesage,{
        dismissOthers : true,
        messageType : MessageType.Error,
      position : Position.BottomCenter
      });
    })

  }
  async ngOnInit() {
    this.getsingleModel("");
    console.log(this.getsingleModel(""))
  }

}
