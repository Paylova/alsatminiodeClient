import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCity } from 'src/app/contracts/create-city';
import { ListCity } from 'src/app/contracts/list-city';
import { ListCountry } from 'src/app/contracts/list-country';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CityService } from 'src/app/services/common/models/city.service';
import { CountryService } from 'src/app/services/common/models/country.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  listOfCountries : Array<ListCountry> = null
  selectedOptions : Array<ListCountry> = [];
  countryName : string = null;
  countryId : string = null;
  singleCountry : ListCountry;
  listOfCities : ListCity = null;
  
  constructor(spinner : NgxSpinnerService,private cityService : CityService,private alertifyService : AlertifyService, private countryService : CountryService) {
    super(spinner)
   }





   async getCountries(){
    const allCountries : {country : ListCountry[]} = await this.countryService.getCountry();
    this.listOfCountries = allCountries.country;
   }
   /*
    async getSingleCountry(countryId : string){
    const getSingle : {country : ListCountry} = 
      await this.countryService.getByIdCountry(countryId);
      this.singleCountry = getSingle.country;
      this.listOfCities = this.singleCountry[0].city;
      return this.singleCountry;
   }
   */
   


   async ngOnInit() {
     await this.getCountries();
   }
   
   async onNgModelChange(event){
    this.countryName = event.countryName
    /*this.countryId = event.id;
    await this.getSingleCountry(this.countryId);*/
   }
   
   @Output() createdCity : EventEmitter<CreateCity> = new EventEmitter();
   create(cityName : HTMLInputElement, countryName : string ){
    this.showSpinner(SpinnerType.ballBeat);
    const create_city : CreateCity = new CreateCity();
    create_city.cityName = cityName.value;
    create_city.countryName = countryName;

    this.cityService.createCity(create_city, ()=> {
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertifyService.message("Şehir başarıyla eklenmiştir.",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdCity.emit(create_city);
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertifyService.message(errorMesage,{
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      })
    })
   }


}
