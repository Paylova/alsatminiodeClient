import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreatePhoneSituation } from 'src/app/contracts/create-phone-situation';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-phonesituations',
  templateUrl: './phonesituations.component.html',
  styleUrls: ['./phonesituations.component.scss']
})
export class PhonesituationsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }
  @ViewChild(ListComponent) listComponents : ListComponent
  createdSituation(createdSituation : CreatePhoneSituation){
    this.listComponents.getSituations();
  }

}
