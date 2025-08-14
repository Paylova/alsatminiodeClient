import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { PhonequestionService } from 'src/app/services/common/models/phonequestion.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PhonecostService } from 'src/app/services/common/models/phonecost.service';
import { ListPhoneCost } from 'src/app/contracts/list-phone-cost';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-phone-question-dialog',
  templateUrl: './phone-question-dialog.component.html',
  styleUrls: ['./phone-question-dialog.component.scss']
})
export class PhoneQuestionDialogComponent extends BaseComponent implements OnInit {


  form: FormGroup;


  constructor(private phoneCostService : PhonecostService,
    @Inject(MAT_DIALOG_DATA) public data : string,
    spinner : NgxSpinnerService,
    private alertifyService : AlertifyService) {
    super(spinner);
    this.form = new FormGroup({
      questionAndAnswers: new FormArray([]),
    });

   }


   list : Array<ListPhoneCost> = null;
   listOfPhoneCosts : Array<ListPhoneCost> = null;
   @Output() newItemEvent = new EventEmitter<string>();




   index: number = 0;
   index2 : number = 0;



   async getSinglePhoneCost(costId : string){
    costId = this.data;
    const getSingle : {phoneCost : ListPhoneCost[]} = 
    await this.phoneCostService.getPhoneCost(costId);
    this.listOfPhoneCosts = getSingle.phoneCost;
    return this.listOfPhoneCosts;
   }
   
  get questionAndAnswers(): FormArray {
    return this.form.get('questionAndAnswers') as FormArray;
  }

  async ngOnInit() {
    await this.getSinglePhoneCost("");
    for (let i = 0; i < this.listOfPhoneCosts.length; i++) {
      this.index = i;

      const formGroup = new FormGroup({
        costId: new FormControl(
          this.listOfPhoneCosts[this.index].id,
        ),
        questionText : new FormControl(
          this.listOfPhoneCosts[this.index].phoneQuestion.questionText,
        ),
        answer: new FormControl(this.listOfPhoneCosts[this.index].phoneCost,Validators.required),
      });
      this.questionAndAnswers.push(formGroup);
    }






  }

  save() {
    this.showSpinner(SpinnerType.ballBeat)
    let formControls = this.questionAndAnswers.getRawValue();
    
    for(let j = 0; j < this.listOfPhoneCosts.length; j++){
      this.index2 = j;
      this.phoneCostService.updatePhoneCost(formControls[this.index2].costId, formControls[this.index2].answer,()=>{
        this.hideSpinner(SpinnerType.ballBeat);
        this.alertifyService.message("Fiyatlar Başarıyla Güncellenmiştir.",{
          dismissOthers : true,
          messageType : MessageType.Success,
          position : Position.BottomCenter 
        });
      },errorMesage => {
        this.hideSpinner(SpinnerType.ballBeat);
        this.alertifyService.message(errorMesage,{
          dismissOthers : true,
          messageType : MessageType.Error,
          position : Position.BottomCenter
        });
      });
      

    }
    
    console.log(formControls[0].answer)
    /* formControls.forEach((formControl) => {
      console.log(formControls[0].costId);
    });   */
    
  }

}
