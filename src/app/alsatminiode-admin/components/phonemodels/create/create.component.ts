import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreatePhoneModel } from 'src/app/contracts/create-phone-model';
import { ListPhoneBrand } from 'src/app/contracts/list-phone-brand';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { PhonebrandService } from 'src/app/services/common/models/phonebrand.service';
import { PhonemodelService } from 'src/app/services/common/models/phonemodel.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {



  constructor(spinner : NgxSpinnerService, private brandService : PhonebrandService,private alertifyService : AlertifyService,
    private modelService : PhonemodelService ) {
    super(spinner)
   }
  

   listOfBrands : Array<ListPhoneBrand> = null;
   selectedOptions : Array<ListPhoneBrand> = [];
   brandName : string = null;

   async getallBrands(){
    const allBrands : {phoneBrand : ListPhoneBrand[]} = await this.brandService.getBrand();
    this.listOfBrands = allBrands.phoneBrand;
   }

  onNgModelChange(event){
    this.brandName = event.brandName;
  }
  async ngOnInit() {
    await this.getallBrands();
  }

  @Output() createdModel : EventEmitter<CreatePhoneModel> = new EventEmitter();
  
  create(modelName : HTMLInputElement,modelFirstPrice : HTMLInputElement,modelLastPrice : HTMLInputElement, brandName : string){
    this.showSpinner(SpinnerType.ballBeat);
    const create_model : CreatePhoneModel = new CreatePhoneModel();
    create_model.modelName = modelName.value;
    create_model.modelFirstPrice = modelFirstPrice.valueAsNumber;
    create_model.modelLastPrice = modelLastPrice.valueAsNumber;
    create_model.brandName = brandName;
    this.modelService.createPhoneModel(create_model,()=> {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message("Model Başarıyla eklenmiştir.",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdModel.emit(create_model);
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message(errorMesage,{
        dismissOthers:true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      });
    });


  }

   


}
