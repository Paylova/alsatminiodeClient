import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreatePhoneModelCapacity } from 'src/app/contracts/create-phone-model-capacity';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-phonemodelcapacity',
  templateUrl: './phonemodelcapacity.component.html',
  styleUrls: ['./phonemodelcapacity.component.scss']
})
export class PhonemodelcapacityComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService) { 
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }
  @ViewChild(ListComponent) listComponents : ListComponent
  createdModel(createdModel : CreatePhoneModelCapacity){
    this.listComponents.getPhoneModelCapacity();
  }
}
