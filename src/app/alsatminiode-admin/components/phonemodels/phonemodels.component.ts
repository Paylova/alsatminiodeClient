import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreatePhoneModel } from 'src/app/contracts/create-phone-model';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-phonemodels',
  templateUrl: './phonemodels.component.html',
  styleUrls: ['./phonemodels.component.scss']
})
export class PhonemodelsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }
  @ViewChild(ListComponent) listComponents : ListComponent
  createdModel(createdModel : CreatePhoneModel){
    this.listComponents.getPhoneModels();
  }

}
