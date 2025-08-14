import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreatePhoneQuestion } from 'src/app/contracts/create-phone-question';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { PhonequestionService } from 'src/app/services/common/models/phonequestion.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService,private phoneQuestionService : PhonequestionService,private alertifyService : AlertifyService) {
    super(spinner)
   }

  ngOnInit(): void {
  }

  @Output() createdQuestion : EventEmitter<CreatePhoneQuestion> = new EventEmitter();


  create(questionText : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const create_phonequestion : CreatePhoneQuestion = new CreatePhoneQuestion();
    create_phonequestion.questionText = questionText.value;

    this.phoneQuestionService.createPhoneQuestion(create_phonequestion,()=>{
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertifyService.message("Soru Başarıyla Eklenmiştir.",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdQuestion.emit(create_phonequestion);
    },errorMesage => {
      this.alertifyService.message(errorMesage,{
        dismissOthers:true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      })
    })
  }

}
