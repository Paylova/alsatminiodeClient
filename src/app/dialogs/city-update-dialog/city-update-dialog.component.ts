import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCity } from 'src/app/contracts/create-city';
import { ListCity } from 'src/app/contracts/list-city';
import { ListCountry } from 'src/app/contracts/list-country';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CityService } from 'src/app/services/common/models/city.service';
import { CountryService } from 'src/app/services/common/models/country.service';

@Component({
  selector: 'app-city-update-dialog',
  templateUrl: './city-update-dialog.component.html',
  styleUrls: ['./city-update-dialog.component.scss']
})
export class CityUpdateDialogComponent extends BaseComponent implements OnInit {

  listOfCountries : Array<ListCountry> = null
  defaultCountryName : string;
  countryName : string = null;
  countryId : string = null;
  singleCountry : ListCountry;
  cityName : ListCity;
  constructor(spinner : NgxSpinnerService,private cityService : CityService,
    @Inject(MAT_DIALOG_DATA) public data : string, private alertifyService : AlertifyService,private countryService : CountryService) {
    super(spinner)
   }

  async getSingleCity(id : string){
    id = this.data;
    const getSingle : {city : ListCity} = await this.cityService.getSingleCity(id);
    this.cityName = getSingle.city[0].cityName;
    this.defaultCountryName = getSingle.city[0].cityCountry.countryName;
  }
  async getCountries(){
    const allCountries : {country : ListCountry[]} = await this.countryService.getCountry();
    this.listOfCountries = allCountries.country;
   }
  async ngOnInit() {
    await this.getCountries();
    await this.getSingleCity("");
    console.log(this.defaultCountryName)
  }
  async onNgModelChange(event){
    this.countryName = event.countryName
    this.countryId = event.id;
    console.log(this.countryId)
   }



  async updateCity(cityNameInput : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const update_city : CreateCity = new CreateCity();
    update_city.id = this.data;
    update_city.cityName = cityNameInput.value;
    update_city.countryId = this.countryId;

    this.cityService.updateCity(update_city,()=> {
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
}
