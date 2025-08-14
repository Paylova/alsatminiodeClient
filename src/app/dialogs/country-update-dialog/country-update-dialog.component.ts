import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCountry } from 'src/app/contracts/list-country';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CountryService } from 'src/app/services/common/models/country.service';

@Component({
  selector: 'app-country-update-dialog',
  templateUrl: './country-update-dialog.component.html',
  styleUrls: ['./country-update-dialog.component.scss']
})
export class CountryUpdateDialogComponent extends BaseComponent implements OnInit {

  countryName : ListCountry;
  constructor(spinner : NgxSpinnerService,
    private countryService : CountryService,
    @Inject(MAT_DIALOG_DATA) public data : string,
    private alertifyService : AlertifyService) {
    super(spinner)
   }


  async getSingleCountry(id : string){
    id = this.data;
    const getSingle : {country : ListCountry} = await this.countryService.getByIdCountry(id);
    this.countryName = getSingle.country[0].countryName;
  }
  async ngOnInit() {
    this.getSingleCountry("");
  }


  async updateCountry(countryName : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const update_country : ListCountry = new ListCountry();
    update_country.id = this.data;
    update_country.countryName = countryName.value;

    this.countryService.updateCountry(update_country,()=>{
      this.hideSpinner(SpinnerType.ballBeat)
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
