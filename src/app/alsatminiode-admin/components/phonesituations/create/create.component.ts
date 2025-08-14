import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreatePhoneSituation } from 'src/app/contracts/create-phone-situation';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { PhonesituationService } from 'src/app/services/common/models/phonesituation.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService,private phoneSituationService : PhonesituationService, private alertfiyService : AlertifyService) { 
    super(spinner)
  }

  ngOnInit(): void {
  }

  @Output() createdSituation : EventEmitter<CreatePhoneSituation> = new EventEmitter();
  create(phoneSituation  : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const create_situation :CreatePhoneSituation = new CreatePhoneSituation();
    create_situation.phoneSituation = phoneSituation.value;

    this.phoneSituationService.createPhoneSituation(create_situation, ()=>{
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertfiyService.message("Durum başarıyla eklenmiştir.",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdSituation.emit(create_situation);
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat);
      this.alertfiyService.message("Durum eklenirken bir hata oluştu.",{
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      });
    });
  }

}
