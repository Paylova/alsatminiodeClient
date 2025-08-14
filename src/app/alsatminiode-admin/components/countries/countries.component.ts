import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCountry } from 'src/app/contracts/create-country';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent extends BaseComponent implements OnInit {
  @ViewChild(ListComponent) listComponents : ListComponent
  constructor(spinner : NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }

  createdCountry(createdCountry : CreateCountry){
    this.listComponents.getCountries();
  }

}
