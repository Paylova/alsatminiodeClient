import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListPhoneBrand } from 'src/app/contracts/list-phone-brand';
import { ListPhoneCost } from 'src/app/contracts/list-phone-cost';
import { ListPhoneModel } from 'src/app/contracts/list-phone-model';
import { CustomerService } from 'src/app/services/common/models/customer.service';
import { PhonebrandService } from 'src/app/services/common/models/phonebrand.service';
import { PhonemodelService } from 'src/app/services/common/models/phonemodel.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PhonecostService } from 'src/app/services/common/models/phonecost.service';
import { ListCountry } from 'src/app/contracts/list-country';
import { ListCity } from 'src/app/contracts/list-city';
import { CityService } from 'src/app/services/common/models/city.service';
import { CountryService } from 'src/app/services/common/models/country.service';
import { ListDistrict } from 'src/app/contracts/list-district';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AgreementDialogComponent } from 'src/app/dialogs/agreement-dialog/agreement-dialog.component';
import { ProtectionOfPersonalDataComponent } from 'src/app/dialogs/protection-of-personal-data/protection-of-personal-data.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CreateCustomer } from 'src/app/contracts/create-customer';
import { CustomerSuccessDialogComponent } from 'src/app/dialogs/customer-success-dialog/customer-success-dialog.component';
import { MatStepper } from '@angular/material/stepper';
import { ListPhoneBrandImage } from 'src/app/contracts/list-phone-brand-image';
import { ListPhoneModelCapacity } from 'src/app/contracts/list-phone-model-capacity';
import { PhonemodelcapacityService } from 'src/app/services/common/models/phonemodelcapacity.service';
import { WebsiteoptionService } from 'src/app/services/common/models/websiteoption.service';
import { ListWebsiteOption } from 'src/app/contracts/list-website-option';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { CreateEmail } from 'src/app/contracts/create-email';
import { EmailService } from 'src/app/services/email.service';
import { ListShippingCompany } from 'src/app/contracts/list-shipping-company';
import { ShippingcompanyService } from 'src/app/services/common/models/shippingcompany.service';

@Component({
  selector: 'app-telefon-sat',
  templateUrl: './telefon-sat.component.html',
  styleUrls: ['./telefon-sat.component.scss']
})
export class TelefonSatComponent extends BaseComponent implements OnInit {

  phoneBrandCTRL = this._formBuilder.group({
    isNext : [false,Validators.requiredTrue]
  });
  phoneModelCTRL = this._formBuilder.group({
    isNext : [false,Validators.requiredTrue]
  });
  questions = this._formBuilder.group({
    imeiNumber : ['',Validators.required],
    ibanNumber : ['']
  });
  personalInfo = this._formBuilder.group({
    customerName : ['',Validators.required],
    customerSurname : ['',Validators.required],
    customerTC : ['',Validators.required],
    customerEmail : ['',Validators.required],
    customerGSM : ['',Validators.required],
    customerCountry : ['',Validators.required],
    shippingCompany : ['',Validators.required],
    customerCity : ['',Validators.required],
    customerDistrict : ['',Validators.required],
    customerAddress : ['',Validators.required],
    thirdCtrl: ['', Validators.required],
  });

  controlsFormGroup : FormGroup;
  radioEx : FormControl = new FormControl();

  constructor(
    spinner: NgxSpinnerService,
    private phoneModelService: PhonemodelService,
    private phoneBrandService: PhonebrandService,
    private customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private phoneCostService: PhonecostService,
    private cityService : CityService,
    private countryService : CountryService,
    private phoneModelCapacityService : PhonemodelcapacityService,
    private websiteOptionService : WebsiteoptionService,
    private dialogService : DialogService,
    private alertifyService : AlertifyService,
    private emailService : EmailService,
    private shippingCompanyService : ShippingcompanyService,
  ) {
    super(spinner);
    this.clearListOfModelsSubject();
  }


  clearListOfModelsSubject(){
    this._listOfModels$ = new BehaviorSubject<ListPhoneModel[]>([]);
    this.listOfModels$ = this._listOfModels$.asObservable();
  }
  radiooption : boolean = false;

  listOfBrands: Array<ListPhoneBrand> = null;
  selectedOptions: Array<ListPhoneBrand> = [];
  brandName: string = null;
  brandId: string = null;
  singleBrand: ListPhoneBrand;

  listModelWithImage : ListPhoneModel[] = [];
  listOfModels: Array<ListPhoneModel> = [];
  _listOfModels$: BehaviorSubject<ListPhoneModel[]>;
  listOfModels$: Observable<ListPhoneModel[]>;
  filteredListOfModels: Observable<ListPhoneModel[]>;
  selectedOptions2: Array<ListPhoneModel> = [];
  selectedModel: ListPhoneModel = null;
  modleId : string = null;

  listOfPhoneCosts: Array<ListPhoneCost> = null;
  selectedDamages: Array<ListPhoneCost> = [];



  selectedDamages2 : {phoneCost : ListPhoneCost};
  selectedDamages3 : {phoneCost : ListPhoneCost};


  currentWorth: number = 0;


  listOfCountries : Array<ListCountry> = null
  selectedCountryOptions : Array<ListCountry> = [];
  countryName : string = null;
  countryId : string = null;
  singleCountry : ListCountry;

  listOfCities : Array<ListCity> = null;
  selectedCityOptions : Array<ListCity> = [];
  cityName : string = null;
  cityId : string = null;
  singleCity : ListCity;

  listOfDistrict : Array<ListDistrict> = null;
  districtName : string = null;
  districtId : string = null;

  listOfShippingCompanies : Array<ListShippingCompany> = null;
  selectedShippingCompanyOptions : Array<ListShippingCompany> = [];
  shippingCompanyName : string = null;
  shippingCompanyId : string = null;
  shippingCompanyDealCode : string = null;
  singleShippingCompany : ListShippingCompany;
  
  customerPhoneCost : number = null;
  customerTotalCost : number = null;
  //customerIBAN : HTMLInputElement;
  customerReferenceCode : number;

  images : any[] = [];
  modelImages : any[] = [];

  phoneBrandImage : ListPhoneBrandImage;

  listOfPhoneModelCapacity : Array<ListPhoneModelCapacity> = null;
  phoneModelCapacityId : string;

  singleOption : ListWebsiteOption = null;
  couponRate : number;

/*
  async getAllPhoneModelCapacity(){
    const allPhoneModelCap : {phoneModelCapacity : ListPhoneModelCapacity[]} =
      await this.phoneModelCapacityService.getModel();
      this.listOfPhoneModelCapacity = allPhoneModelCap.phoneModelCapacity;
  }
  */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let searchTerm = filterValue.trim().toLowerCase();
    this.filteredListOfModels = this.listOfModels$;
    let filteredData = [];
      this.listOfModels$.pipe(
        tap((res) => {
          filteredData = res.filter(x => x.modelName.trim().toLocaleLowerCase().includes(searchTerm));
        })
      ).subscribe();
      this.filteredListOfModels = of(filteredData);
  }

  async getPhoneModelCapacityWithModel(){
    const phoneModelCapacityWithModels : {phoneModelCapacity : ListPhoneModelCapacity[]} =
      await this.phoneModelCapacityService.getPhoneModelCapacityWithModelId(this.selectedModel.id);
    this.listOfPhoneModelCapacity = phoneModelCapacityWithModels.phoneModelCapacity;
  }

  async getallModels() {
    const allModels: { phoneModel: ListPhoneModel[] } =
      await this.phoneModelService.getModel();
    this.listOfModels = allModels.phoneModel;

    
  }

  async getPhoneModelForBrand(id : string){
    const phoneModels : {phoneModel : ListPhoneModel[]} = 
    await this.phoneModelService.getPhoneModelForBrand(id);
    this.listModelWithImage = phoneModels.phoneModel;
    return this.listModelWithImage
  }

  async getallBrands() {
    const allBrands: { phoneBrand: ListPhoneBrand[] } =
      await this.phoneBrandService.getBrand();
    this.listOfBrands = allBrands.phoneBrand;  
    
  }

  async getSingleBrand(brandId: string) {
    const getSingle: { phoneBrand: ListPhoneBrand } =
      await this.phoneBrandService.getSingleBrand(brandId);
    this.singleBrand = getSingle.phoneBrand;
    this.listOfModels = this.singleBrand[0].brandModels;
    return this.singleBrand;
  }
  

  async getPhoneCost() {
    const allPhoneCosts: { phoneCost: ListPhoneCost[] } =
      await this.phoneCostService.getPhoneCost(this.selectedModel.id);
    this.listOfPhoneCosts = allPhoneCosts.phoneCost;
  }

  
  async getCountries(){
    const allCountries : {country : ListCountry[]} = await this.countryService.getCountry();
    this.listOfCountries = allCountries.country;
   }

   async getShippingCompanies(){
    const allShippingCompanies : {shippingCompany : ListShippingCompany[]} = await this.shippingCompanyService.getCompany();
    this.listOfShippingCompanies = allShippingCompanies.shippingCompany;
   }

  async getSingleCountry(countryId : string){
    const getSingle : {country : ListCountry} = 
      await this.countryService.getByIdCountry(countryId);
      this.singleCountry = getSingle.country;
      this.listOfCities = this.singleCountry[0].countryCities;
      return this.listOfCities;    
   }

  async getSingleCity(cityId : string){
    const getSingle : {city : ListCity} =
    await this.cityService.getSingleCity(cityId);
    this.singleCity = getSingle.city;
    this.listOfDistrict = this.singleCity[0].cityDistricts;
    return this.listOfDistrict;
  }

  async getSingleWebsiteOption(id : string){
    const getSingle : {websiteOption : ListWebsiteOption} = 
    await this.websiteOptionService.GetByIdOption(id);
    this.singleOption = getSingle.websiteOption;
    //this.couponRate = this.singleOption[0].giftCouponRate;
    return this.singleOption;
  }

  async getCities(){
    const allCities : {city : ListCity[]} = await this.cityService.getCity();
    this.listOfCities = allCities.city;
  }


  async onNgModelChange(event) {
    this.brandName = event.brandName;
    this.brandId = event.id;
    await this.getSingleBrand(this.brandId);
  }


  async getBrand(brand : ListPhoneBrand,brandId : string,brandName : string,stepper : MatStepper){
    this.brandName = brandName;
    this.brandId = brandId;
    await this.getPhoneModelForBrand(this.brandId);
    this.listOfModels = brand.brandModels;
    this._listOfModels$.next(this.listModelWithImage);
    if(brand.brandModels[0] == null){
      this.alertifyService.message("Bu marka şu anda güncellenmektedir !.",{
        dismissOthers: true,
        messageType : MessageType.Warning,
        position : Position.TopCenter
      })
    }
    else{
      this.phoneBrandCTRL.setValue({isNext : true})
      stepper.next();
    
            this.listOfModels.forEach(async phoneModel => {
        let image = await this.phoneModelService.readImages(phoneModel.id);
        let model = {
          filePath:image[0].filePath,
          modelId: phoneModel.id
        }
        this.images.push(model)
      })
      

    }
  }

  filterModelImage(modelId:string, list:any[]): any{
    let value = list.filter(x=>x.modelId == modelId)[0];
    if(value){
      return value.filePath
    }
    return ''
  }


  realCurrentWorth : number = 0;
  async getModel(model : ListPhoneModel,modelId : string,stepper : MatStepper){
    this.currentWorth = 0;
    this.phoneModelCTRL.setValue({isNext : true})
    this.selectedModel = model;
    this.modleId = modelId;
    this.currentWorth = this.selectedModel.modelFirstPrice;
    this.realCurrentWorth = this.selectedModel.modelFirstPrice;
    await this.getPhoneCost();
    await this.getPhoneModelCapacityWithModel();





    
    stepper.next();
    this.gotoTop();
  }
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }


  async onNgModelChange2(event) {
    this.selectedModel = event;
    this.modleId = event.id;
    this.currentWorth = this.selectedModel.modelFirstPrice;
    this.customerPhoneCost = this.selectedModel.modelFirstPrice;
    await this.getPhoneCost();
  }

  async onNgModelChangeCity(event){
    this.cityName = event.cityName
    this.cityId = event.id;
    await this.getSingleCity(this.cityId);
  }
  async onNgModelChangeCountry(event){
    this.countryName = event.countryName
    this.countryId = event.id;
    await this.getSingleCountry(this.countryId);
  }
  async onNgModelChangeDistrict(event){
    this.districtId = event.id;
    this.districtName = event.districtName
  }
  async onNgModelChangeCompany(event){
    this.shippingCompanyName = event.companyName
    this.shippingCompanyDealCode = event.companyDealCode
    this.shippingCompanyId = event.id
  }





  data : any[];
  phoneModelimages : string[] = [];
  async ngOnInit() {
    this.realCurrentWorth = 0;
    await this.getSingleWebsiteOption("3541c1df-c61a-4980-bf78-186942c4410c");
    this.couponRate = this.singleOption[0].giftCouponRate
    await this.getShippingCompanies();
    await this.getallBrands();
    await this.getCountries();
    //TODO: Bu kod parçası tekrardan kontrol edilecek.
    this.listOfBrands.forEach(async brand => {
      let image = await this.phoneBrandService.readImages(brand.id);
      let model = {
        filePath:image[0].filePath,
        brandId: brand.id
      }
      this.images.push(model)
    })
    this.filteredListOfModels = this.listOfModels$;
    this.listOfModels.forEach(m => {
      this.phoneModelimages.push(m.phoneModelImageFile[0].filePath)
    })


    this.controlsFormGroup = this._formBuilder.group({
      radioEx : this.radioEx
    })
    this.showSpinner(SpinnerType.ballBeat);
  }

  filterBrandImage(brandId:string, list:any[]): any{
    let value = list.filter(x=>x.brandId == brandId)[0];
    if(value){
      return value.filePath
    }
    return ''
  }



  customerPaymentChoose : string = "Miniöde Hediye Çeki";
  option : boolean = false;
  OptionMini(){
    this.customerPaymentChoose = "Miniöde Hediye Çeki";
    this.option = false;    
  }
  OptionEFT(){
    this.customerPaymentChoose="Havale/EFT";
    this.option = true;
  }








  sorular : any[] = [];


  async radioYes(model : any){
    this.sorular.push(model)
    const getSingleCost : any =
    await this.phoneCostService.getByIdPhoneCost(model.id);

    this.selectedDamages2 = getSingleCost;
    this.currentWorth = this.selectedModel.modelFirstPrice;
    /*for (const cost of this.selectedDamages2) {

      this.currentWorth -= cost.phoneCost
    } */
    this.currentWorth -= this.selectedDamages2.phoneCost[0].phoneCost;
    this.selectedModel.modelFirstPrice = this.currentWorth;
    
    if(this.currentWorth < this.selectedModel.modelLastPrice){
       this.currentWorth = this.selectedModel.modelLastPrice
    }
  }




  capacity : Array<number> = [];
  phoneCap : string;
  async OnPhoneModelCapacityChange(phoneModelCapacity : ListPhoneModelCapacity){
    this.currentWorth = this.selectedModel.modelFirstPrice;
    this.currentWorth += phoneModelCapacity.phoneModelCapacityPrice; // 5900 + 300
    this.phoneCap = phoneModelCapacity.phoneModelCapacityName;
    this.selectedModel.modelFirstPrice = this.currentWorth;
    
    this.capacity.push(phoneModelCapacity.phoneModelCapacityPrice);
    let number = this.capacity.length -2;
    if(this.capacity[number] == undefined){}
    else{
      this.currentWorth = this.selectedModel.modelFirstPrice;
      this.currentWorth -= this.capacity[number]; // 6200 - 300
      this.selectedModel.modelFirstPrice = this.currentWorth;
      this.capacity.splice(number,1);  
    }



    if(this.currentWorth < this.selectedModel.modelLastPrice){
      this.currentWorth = this.selectedModel.modelLastPrice
   }
  }



  async onSelectedDamagesChanged2(event){
    const getSingleCost : {phoneCost : ListPhoneCost} =
    await this.phoneCostService.getByIdPhoneCost(event.target.value);
    this.sorular.push(getSingleCost);
    /** */

    

    this.selectedDamages2 = getSingleCost;
    this.currentWorth = this.selectedModel.modelFirstPrice;
    /*for (const cost of this.selectedDamages2) {

      this.currentWorth -= cost.phoneCost
    } */
    this.currentWorth -= this.selectedDamages2.phoneCost[0].phoneCost;
    this.selectedModel.modelFirstPrice = this.currentWorth;
    
    if(this.currentWorth < this.selectedModel.modelLastPrice){
       this.currentWorth = this.selectedModel.modelLastPrice
    }
    //console.log(this.currentWorth)
  }
  async radioNo(model : any){
    const getSingleCost : any =
    await this.phoneCostService.getByIdPhoneCost(model.id);

    this.selectedDamages3 = getSingleCost;
    this.currentWorth = this.selectedModel.modelFirstPrice;
    this.currentWorth += this.selectedDamages3.phoneCost[0].phoneCost;
    this.selectedModel.modelFirstPrice = this.currentWorth;

    let value = this.sorular.filter(x => x == model)[0];
    if(value){
      const index: any = this.sorular.indexOf(value);
      if (index !== -1) {
          this.sorular.splice(index, 1);
      } 
    }
    if(this.currentWorth < this.selectedModel.modelLastPrice){
      this.currentWorth = this.selectedModel.modelLastPrice
    }
  }
  
  isCheckedAgreement : boolean = false;
  checkValueAgreement(event: any){
    this.isCheckedAgreement = true;
    this.openAgreement();
  }
  isCheckedProtection : boolean = false;
  checkValueProtection(event: any){
    this.isCheckedProtection=true;
    this.openProtection();
  }

  openAgreement(){
    this.dialogService.openDialog({
      componentType : AgreementDialogComponent,
      options : {
        width : "100%"
      }
    })
  }
  openProtection(){
    this.dialogService.openDialog({
      componentType : ProtectionOfPersonalDataComponent,
      options : {
        width : "100%"
      }
    })
  }



  customerId : string;
  sendCustomer(customerPhoneIMEI : HTMLInputElement,customerIBAN : HTMLInputElement,customerPhoneDescription : HTMLTextAreaElement,customerName : HTMLInputElement, customerSurname : HTMLInputElement, customerTC : HTMLInputElement,customerMail : HTMLInputElement,customerGSM : HTMLInputElement,customerAddress : HTMLTextAreaElement){
    this.customerReferenceCode = Math.floor(Math.random() * 899999 + 100000);
    localStorage.setItem('referanceCode', this.customerReferenceCode.toString());
    localStorage.setItem('shippingCompanyId', this.shippingCompanyId.toString());

    if(!this.isCheckedAgreement && !this.isCheckedProtection || !this.isCheckedAgreement || !this.isCheckedProtection){
      this.alertifyService.message("Cihazı göndermek için sözleşmeyi kabul etmeniz gerekiyor.",{
        dismissOthers : true,
        messageType : MessageType.Warning,
        position : Position.TopCenter
      });

    }
    else if(customerName.value.trim()== "" || customerSurname.value.trim()== "" || customerTC.value.trim()== "" || customerMail.value.trim()== ""
    || customerMail.value.trim()== "" || customerGSM.value.trim()== "" || customerAddress.value.trim()== "" || this.countryId == "" || this.cityId == "" || this.countryId == null
    || this.cityId == null || this.districtId == "" || this.districtId == null || this.shippingCompanyId == null || this.shippingCompanyId == ""){
      this.alertifyService.message("Lütfen zorunlu alanları doldurunuz.",{
        dismissOthers : true,
        messageType : MessageType.Warning,
        position : Position.TopCenter
      });
    }
    else{
      this.showSpinner(SpinnerType.ballBeat);
      const create_email : CreateEmail = new CreateEmail();
      const create_customer : CreateCustomer = new CreateCustomer();
      create_customer.customerName = customerName.value;
      create_customer.customerSurname = customerSurname.value;
      create_customer.customerTC = customerTC.value;
      create_customer.customerMail = customerMail.value;
      create_customer.customerGSM = customerGSM.value;
      create_customer.customerAddress = customerAddress.value;
      create_customer.customerPhoneIMEI = customerPhoneIMEI.value;
      create_customer.customerPhoneDescription = customerPhoneDescription.value + " " + this.phoneCap;
      if(this.option) {this.currentWorth *= this.couponRate; create_customer.customerPhoneCost = this.currentWorth; 
      create_customer.customerPaymentChoose = "Havale/EFT"; create_customer.customerIBAN = customerIBAN.value  }
      else{create_customer.customerPhoneCost = this.currentWorth; 
      create_customer.customerPaymentChoose="Miniöde.com Hediye Çeki"; create_customer.customerIBAN = "Boş";}
      create_customer.customerReferenceCode = this.customerReferenceCode.toString();
      create_customer.customerRandomPassword = "şifre";
      create_customer.phoneBrand = this.brandId;
      create_customer.phoneModel = this.modleId;
      create_customer.customerCountry = this.countryId;
      create_customer.customerCity = this.cityId;
      create_customer.customerDistrict = this.districtId;
      create_customer.customerPhoneSituation = "BA32C9DA-F535-4641-BD2F-08DA8D802A5E";
      create_customer.customerShippingCompanyName = this.shippingCompanyName;
      create_email.toEmail = customerMail.value;
      create_email.subject = "ALSAT-MİNİODE "+this.brandName+" "+ this.selectedModel.modelName+" "+"CİHAZINIZ HAKKINDA";
      create_email.body = "<!DOCTYPE html><html lang='en' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:v='urn:schemas-microsoft-com:vml'><head><title></title>"+
      "<meta content='text/html; charset=utf-8' http-equiv='Content-Type'/><meta content='width=device-width, initial-scale=1.0' name='viewport'/>"+
      "<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'/>"+
      "<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Permanent+Marker' rel='stylesheet' type='text/css'/>"+
      "<link href='https://fonts.googleapis.com/css?family=Abril+Fatface' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'/>"+
      "<link href='https://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet' type='text/css'/>"+
      "<link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'/><style> * {box-sizing: border-box;} body {margin: 0;padding: 0;} #MessageViewBody a {color: inherit;text-decoration: none;}"+
      "p {line-height: inherit} .desktop_hide, .desktop_hide table {mso-hide: all;display: none;max-height: 0px;overflow: hidden;} @media (max-width:700px) {.row-content {width: 100% !important;} "+
      ".mobile_hide {display: none;} .stack .column {width: 100%;display: block;} .mobile_hide {min-height: 0;max-height: 0;max-width: 0;overflow: hidden;font-size: 0px;} .desktop_hide, .desktop_hide table {display: table !important;max-height: none !important;} } </style> </head> "+
      "<body style='background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;'> <table border='0' cellpadding='0' cellspacing='0' class='nl-container' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;' width='100%'>"+
      "<tbody> <tr> <td> <table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-1' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'> <tbody> <tr> <td>"+
      "<table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5d77a9; color: #000000; width: 680px;' width='680'>"+
      "<tbody> <tr> <td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'>"+
      "<table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'> <tr> <td style='padding-bottom:10px;padding-top:10px;width:100%;padding-right:0px;padding-left:0px;'>"+
      "<div align='center' style='line-height:10px'><img alt='Alsatminiode-logo' src='https://alsatminiode.com/api//resource/teklifModel-images/miniode_logo.png' style='display: block; height: auto; border: 0; width: 350px; max-width: 100%;' title='Yourlogo Light' width='350'/></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"+
      "<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-2' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cbdbef; color: #000000; width: 680px;' width='680'>"+
      "<tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'>"+
      "<table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;'><div align='center' style='line-height:10px'><img alt='Check Icon' src='https://alsatminiode.com/api//resource/teklifModel-images/check-icon.png' style='display: block; height: auto; border: 0; width: 93px; max-width: 100%;' title='Check Icon' width='93'/></div>"+
      "</td> </tr> </table> <table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'> <tr> <td style='padding-bottom:25px;padding-left:20px;padding-right:20px;padding-top:10px;'>"+
      "<div style='font-family: Georgia, 'Times New Roman', serif'> <div class='txtTinyMce-wrapper' style='font-size: 14px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 16.8px; color: #2f2f2f; line-height: 1.2;'> <p style='margin: 0; font-size: 14px; text-align: center;'><span style='font-size:42px;'>Ön Teklif Verildi</span></p>"+
      "</div> </div> </td> </tr> </table> <table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'> <tr> <td style='padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;'>"+
      "<div style='font-family: sans-serif'> <div class='txtTinyMce-wrapper' style='font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #2f2f2f; line-height: 1.5;'> <p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 24px;'><span style='font-size:16px;'>Merhaba "+ customerName.value +",</span></p>"+
      "<p style='margin: 0; font-size: 14px; text-align: center;'>"+ this.brandName +" " + this.selectedModel.modelName +" telefonunuz için ön teklifimiz"+ " " + this.currentWorth + " ₺ </p>" +
      "<p style='margin: 0; font-size: 14px; text-align: center;'>Referans Kodunuz: "+ " " + this.customerReferenceCode + " </p>"+
      "<p style='margin: 0; font-size: 14px; text-align: center;'>" + this.shippingCompanyName + " :" + this.shippingCompanyDealCode + "</p>"+
      "</div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"+
      "<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-3' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'>"+"<tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;' width='680'>"+
      "<tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'>"+
      "<tr><td style='padding-bottom:40px;padding-left:30px;padding-right:30px;padding-top:40px;'><div style='font-family: Verdana, sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; font-family: Verdana, Geneva, sans-serif; mso-line-height-alt: 18px; color: #2f2f2f; line-height: 1.5;'><p style='margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 33px; letter-spacing: 1px;'><span style='font-size:22px;'><strong>Talimatlar</strong></span></p>"+
      "<p style='margin: 0; font-size: 12px; text-align: center; letter-spacing: 1px; mso-line-height-alt: 18px;'> </p><p style='margin: 0; font-size: 12px; letter-spacing: 1px;'>1- Referans kodunu bir kağıda yazın. Telefonunuz ile birlikte referans kodunu yazdığınız kağıdı da bize gönderin.</p><p style='margin: 0; font-size: 12px; letter-spacing: 1px; mso-line-height-alt: 18px;'> </p><p style='margin: 0; font-size: 12px; letter-spacing: 1px;'>2-  Telefonunuzu"+ this.shippingCompanyName + " " + "kodumuz ile birlikte dilediğiniz bir" + this.shippingCompanyName + " " + "şubesine teslim edin. Ürününüzü teslim ederken sadece"+ this.shippingCompanyName + " " +"kodunu vermeniz yeterli olacaktır.</p>"+
      "<p style='margin: 0; font-size: 12px; letter-spacing: 1px; mso-line-height-alt: 18px;'> </p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table>"+
      "<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-4' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5d77a9; color: #000000; width: 680px;' width='680'>"+
      "<tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:20px;'><div align='center' style='line-height:10px'><img alt='Alsatminiode-logo' src='https://alsatminiode.com/api//resource/teklifModel-images/miniode_logo.png' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Yourlogo Light' width='204'/></div></td></tr></table>"+
      "<table border='0' cellpadding='10' cellspacing='0' class='social_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='social-table' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='108px'><tr><td style='padding:0 2px 0 2px;'><a href='https://www.facebook.com/miniodecom/' target='_blank'><img alt='Facebook' height='32' src='https://alsatminiode.com/api//resource/teklifModel-images/facebook2x.png' style='display: block; height: auto; border: 0;' title='Facebook' width='32'/></a></td><td style='padding:0 2px 0 2px;'><a href='https://www.instagram.com/miniode_com/' target='_blank'><img alt='Instagram' height='32' src='https://alsatminiode.com/api//resource/teklifModel-images/instagram2x.png' style='display: block; height: auto; border: 0;' title='Instagram' width='32'/></a></td>"+
      "<td style='padding:0 2px 0 2px;'><a href='https://wa.me/905372652047/?text=Merhaba Alsatminiode.com için yazmaktayım. Destek Rica Ediyorum Referans Kodum : "+ this.customerReferenceCode +"' target='_blank'><img alt='WhatsApp' height='32' src='https://alsatminiode.com/api//resource/teklifModel-images/whatsapp2x.png' style='display: block; height: auto; border: 0;' title='WhatsApp' width='32'/></a></td></tr></table></td></tr></table><table border='0' cellpadding='10' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 14px; mso-line-height-alt: 21px; color: #f9f9f9; line-height: 1.5; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;'><p style='margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 18px;'><span style='font-size:12px;'>Yenibosna Merkez Mahallesi 29 Ekim Caddesi İstanbul Vizyon Park Ofisleri 4.Plaza Kat:6 No:601, 34197 Bahçelievler</span></p>"+
      "<p style='margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 18px;'><span style='color:#ffffff;font-size:12px;'><a href='tel:(0212) 709 62 72' jsaction='rcuQ6b:npT2md;F75qrd' jscontroller='LWZElb' jsdata='QKGTRc;_;CK/Q7U' rel='noopener' style='text-decoration:underline;color:#ffffff;' target='_blank' title='tel:(0212) 709 62 72'>(0212) 709 62 72</a></span></p><p style='margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 18px;'><span style='color:#ffffff;font-size:12px;'><a href='mailto:info@emperorr.com' rel='noopener' style='text-decoration:underline;color:#ffffff;' target='_blank' title='info@emperorr.com'>info@emperorr.com</a></span></p>"+
      "</div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-5' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'>"+
      "<tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5d77a9; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='10' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'>"+
      "<tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #cfceca; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><span style='font-size:12px;'>2020 © Tüm Hakları Saklıdır</span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>";
      this.customerService.createCustomer(create_customer,()=>{
        this.hideSpinner(SpinnerType.ballBeat)
        this.dialogService.openDialog({
          componentType : CustomerSuccessDialogComponent,
          options : {
            width : "100%"
          }
        })
      },errorMesage => {
        this.hideSpinner(SpinnerType.ballBeat)
        this.alertifyService.message("Zorunlu alanları doldurunuz.",{
          dismissOthers : true,
          messageType : MessageType.Error,
          position : Position.TopCenter      
        });
      });
      this.emailService.sendEmail(create_email,()=>{
        this.alertifyService.message("Mail Gönderildi",{
          dismissOthers : true,
          messageType : MessageType.Success,
          position : Position.TopCenter
        })
      },()=>{
        this.alertifyService.message("Mail Gönderilirken Hata Oluştu Hata Kodu 404",{
          dismissOthers : true,
          messageType : MessageType.Error,
          position : Position.TopCenter
        })
      } );
    }
  }


  goToGuarantee(){
    window.location.href = 'https://garantiemperor.com/';
  }


}
