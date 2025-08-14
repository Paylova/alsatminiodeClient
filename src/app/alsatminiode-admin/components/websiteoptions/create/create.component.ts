import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListWebsiteOption } from 'src/app/contracts/list-website-option';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { WebsiteoptionService } from 'src/app/services/common/models/websiteoption.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  singleOption : ListWebsiteOption = null;

  constructor(spinner : NgxSpinnerService,
    private websiteOptionService : WebsiteoptionService,
    private alertifyService : AlertifyService
    ) {
    super(spinner);

  }



  async getSingleWebsiteOption(id : string){
    const getSingle : {websiteOption : ListWebsiteOption} = 
    await this.websiteOptionService.GetByIdOption(id);
    this.singleOption = getSingle.websiteOption;
    return this.singleOption;
  }






  optionId : string
  async ngOnInit() {
    await this.getSingleWebsiteOption("3541c1df-c61a-4980-bf78-186942c4410c");
    this.optionId = this.singleOption[0].id;
  }

  update(mailHost : HTMLInputElement,mailUsername : HTMLInputElement,mailPassword:HTMLInputElement,mailPort : HTMLInputElement,mailReplyMail : HTMLInputElement,giftCouponRate : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const update_option : ListWebsiteOption = new ListWebsiteOption();
    update_option.id = this.optionId;
    update_option.mailHost = mailHost.value;
    update_option.mailUsername = mailUsername.value;
    update_option.mailPassword = mailPassword.value;
    update_option.mailPort = mailPort.value;
    update_option.mailReplyMail = mailReplyMail.value;
    update_option.giftCouponRate = parseFloat(giftCouponRate.value);

    this.websiteOptionService.updateWebsiteOption(update_option.id,
      update_option.mailHost,
      update_option.mailUsername,update_option.mailPassword,
      update_option.mailPort,update_option.mailReplyMail,update_option.giftCouponRate,()=> {
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
      });
  }
  

}

