import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-websiteoptions',
  templateUrl: './websiteoptions.component.html',
  styleUrls: ['./websiteoptions.component.scss']
})
export class WebsiteoptionsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }

}
