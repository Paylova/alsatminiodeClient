import { Component, OnInit, ViewChild } from '@angular/core';
import { CreatePhoneQuestion } from 'src/app/contracts/create-phone-question';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-phonequestion',
  templateUrl: './phonequestion.component.html',
  styleUrls: ['./phonequestion.component.scss']
})
export class PhonequestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild(ListComponent) listComponents : ListComponent
  createdQuestion(createdQuestion : CreatePhoneQuestion){
    this.listComponents.getPhoneQuestions();
  }
  

}
