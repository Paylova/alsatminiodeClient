import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCountry } from 'src/app/contracts/create-country';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CountryService } from 'src/app/services/common/models/country.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  @Output() createdCountry : EventEmitter<CreateCountry> = new EventEmitter();
  constructor(spinner : NgxSpinnerService, private countryService : CountryService, private alertfiyService : AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }


  create (countryName : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const create_country : CreateCountry = new CreateCountry();
    create_country.countryName = countryName.value;
    this.countryService.createCountry(create_country, ()=>{
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertfiyService.message("Ülke başarıyla eklenmiştir.",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdCountry.emit(create_country);
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertfiyService.message(errorMesage,{
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      });
    })
  
  }
  


}

