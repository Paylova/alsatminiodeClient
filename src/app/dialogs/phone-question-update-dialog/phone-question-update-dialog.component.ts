import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListPhoneQuestion } from 'src/app/contracts/list-phone-question';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { PhonequestionService } from 'src/app/services/common/models/phonequestion.service';

@Component({
  selector: 'app-phone-question-update-dialog',
  templateUrl: './phone-question-update-dialog.component.html',
  styleUrls: ['./phone-question-update-dialog.component.scss']
})
export class PhoneQuestionUpdateDialogComponent extends BaseComponent implements OnInit {

  questionText : ListPhoneQuestion;
  constructor(spinner : NgxSpinnerService,private phonequestionService : PhonequestionService,@Inject(MAT_DIALOG_DATA) public data : string,private alertifyService : AlertifyService) {
    super(spinner)
   }


   async getSingleQuestion(id : string){
    id = this.data;
    const getSingle : {phoneQuestion : ListPhoneQuestion} = await this.phonequestionService.getByIdQuestion(id);
    this.questionText = getSingle.phoneQuestion[0].questionText;
  }

  async ngOnInit() {
    console.log(this.questionText)
    this.getSingleQuestion("");
  }


  updateQuestion(questionTextInput : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const update_phoneQuestion : ListPhoneQuestion = new ListPhoneQuestion();
    update_phoneQuestion.id = this.data;
    update_phoneQuestion.questionText = questionTextInput.value;

    this.phonequestionService.updateQuestion(update_phoneQuestion,()=>{
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
