import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreatePhoneModelCapacity } from 'src/app/contracts/create-phone-model-capacity';
import { ListPhoneBrand } from 'src/app/contracts/list-phone-brand';
import { ListPhoneModel } from 'src/app/contracts/list-phone-model';
import { ListPhoneModelCapacity } from 'src/app/contracts/list-phone-model-capacity';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { PhonebrandService } from 'src/app/services/common/models/phonebrand.service';
import { PhonemodelService } from 'src/app/services/common/models/phonemodel.service';
import { PhonemodelcapacityService } from 'src/app/services/common/models/phonemodelcapacity.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  listOfModels : Array<ListPhoneModel> = null;
  selectedOptions : Array<ListPhoneModel> = [];
  modelId : string = null;

  listOfBrands : Array<ListPhoneBrand> = null;
  selectedOptions2 : Array<ListPhoneBrand> = [];
  singleBrand : ListPhoneBrand;
  brandName : string = null;
  brandId : string = null;

  constructor(spinner : NgxSpinnerService, private phoneModelCapacityService : PhonemodelcapacityService,private alertifyService : AlertifyService,
    private modelService : PhonemodelService,private phoneBrandService : PhonebrandService) {
      super(spinner)
     }

  async getAllModels(){
    const allModels : {phoneModel : ListPhoneModel[]} = await this.modelService.getModel();
    this.listOfModels = allModels.phoneModel;
  }
  async getAllBrands(){
    const allBrands : {phoneBrand : ListPhoneBrand[]} = await this.phoneBrandService.getBrand();
    this.listOfBrands = allBrands.phoneBrand;
  }
  async getSingleBrand(brandId: string) {
    const getSingle: { phoneBrand: ListPhoneBrand } =
      await this.phoneBrandService.getSingleBrand(brandId);
    this.singleBrand = getSingle.phoneBrand;
    this.listOfModels = this.singleBrand[0].brandModels;
    return this.singleBrand;
  }




  async ngOnInit() {
    await this.getAllBrands();
  }

  async onNgModelChange2(event) {
    this.brandName = event.brandName;
    this.brandId = event.id;
    await this.getSingleBrand(this.brandId);
  }
  onNgModelChange(event){
    this.modelId = event.id;
  }

  @Output() createdModel : EventEmitter<CreatePhoneModelCapacity> = new EventEmitter();

  create(phoneModelCapacityName : HTMLInputElement, phoneModelCapacityPrice : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const create_model : CreatePhoneModelCapacity = new CreatePhoneModelCapacity();
    create_model.phoneModelCapacityName = phoneModelCapacityName.value;
    create_model.phoneModelCapacityPrice = parseInt(phoneModelCapacityPrice.value);
    create_model.id = this.modelId;

    this.phoneModelCapacityService.createPhoneModelCapacity(create_model,() => {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message("Ekleme Başarılı.",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdModel.emit(create_model);
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message(errorMesage,{
        dismissOthers :true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      });
    });
  }


}
