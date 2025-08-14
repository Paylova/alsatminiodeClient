import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateDistrict } from 'src/app/contracts/create-district';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss']
})
export class DistrictsComponent extends BaseComponent implements OnInit {

  @ViewChild(ListComponent) listComponents : ListComponent
  constructor(spinner : NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }

  createdDistrict(createdDistrict : CreateDistrict){
    this.listComponents.getDistricts();
  }

}
