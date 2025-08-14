import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCity } from 'src/app/contracts/create-city';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent extends BaseComponent implements OnInit {
  @ViewChild(ListComponent) listComponents : ListComponent
  
  constructor(spinner : NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }
  
  createdCity(createdcity : CreateCity){
    this.listComponents.getCities();
  }


}

