import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateDistrict } from 'src/app/contracts/create-district';
import { ListCity } from 'src/app/contracts/list-city';
import { ListCountry } from 'src/app/contracts/list-country';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CityService } from 'src/app/services/common/models/city.service';
import { CountryService } from 'src/app/services/common/models/country.service';
import { DistrictService } from 'src/app/services/common/models/district.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {


  listOfCountries : Array<ListCountry> = null
  selectedCountryOptions : Array<ListCountry> = [];
  countryName : string = null;
  countryId : string = null;
  singleCountry : ListCountry;


  listOfCities : Array<ListCity> = null;
  selectedCityOptions : Array<ListCity> = [];
  cityName : string = null;

  constructor(spinner : NgxSpinnerService,private districtService : DistrictService,private cityService : CityService, private countryService : CountryService, private alertifyService : AlertifyService) {
    super(spinner)
   }




  async getCountries(){
   const allCountries : {country : ListCountry[]} = await this.countryService.getCountry();
   this.listOfCountries = allCountries.country;
  }

  async getSingleCountry(countryId : string){
    const getSingle : {country : ListCountry} = 
      await this.countryService.getByIdCountry(countryId);
      this.singleCountry = getSingle.country;
      this.listOfCities = this.singleCountry[0].countryCities;
      console.log(this.singleCountry)
      return this.listOfCities;

      
   }

  async getCities(){
    const allCities : {city : ListCity[]} = await this.cityService.getCity();
    this.listOfCities = allCities.city;
  }


  async ngOnInit() {
    await this.getCountries();
  }
  async onNgModelChangeCity(event){
    this.cityName = event.cityName
  }
  async onNgModelChangeCountry(event){
    this.countryName = event.countryName
    this.countryId = event.id;
    await this.getSingleCountry(this.countryId);
  }

  @Output() createdDistrict : EventEmitter<CreateDistrict> = new EventEmitter();

  create(districtName : HTMLInputElement, cityName : string, countryName : string){
    this.showSpinner(SpinnerType.ballBeat);
    const create_district : CreateDistrict = new CreateDistrict();
    create_district.districtName = districtName.value;
    create_district.cityName = cityName;
    create_district.countryName = countryName;

    this.districtService.createDistrict(create_district, ()=> {
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertifyService.message("İlçe başarıyla eklenmiştir.",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdDistrict.emit(create_district);
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertifyService.message(errorMesage,{
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      })
    })
  }








}
