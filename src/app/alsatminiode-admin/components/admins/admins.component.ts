import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateAdmin } from 'src/app/contracts/create-admin';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballBeat);
  }

  @ViewChild(ListComponent) listComponents : ListComponent
    createdAdmin(createdAdmin : CreateAdmin){
      this.listComponents.getAdmins();
    }

}
