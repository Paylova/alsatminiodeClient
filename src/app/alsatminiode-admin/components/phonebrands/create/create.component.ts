import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreatePhoneBrand } from 'src/app/contracts/create-phone-brand';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { PhonebrandService } from 'src/app/services/common/models/phonebrand.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService,private phoneBrandService : PhonebrandService, private alertifyService : AlertifyService) {
    super(spinner)
   }

  ngOnInit(): void {
  }

  @Output() createdBrand : EventEmitter<CreatePhoneBrand> = new EventEmitter();
  create (brandName : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const create_brand : CreatePhoneBrand = new CreatePhoneBrand();
    create_brand.brandName = brandName.value;

    this.phoneBrandService.createPhoneBrand(create_brand, ()=> {
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertifyService.message("Marka başarıyla eklenmiştir.",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdBrand.emit(create_brand);
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message(errorMesage, {
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      });
    });
  }
}

