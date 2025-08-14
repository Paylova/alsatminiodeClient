import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListPhoneSituation } from 'src/app/contracts/list-phone-situation';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { PhonesituationService } from 'src/app/services/common/models/phonesituation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns : string[] = ['phoneSituation','createdDate','updatedDate','deleteColumn','updateColumn'];
  dataSource : MatTableDataSource<ListPhoneSituation> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(spinner : NgxSpinnerService,private phoneSituationService : PhonesituationService, private alertifyService : AlertifyService) { 
    super(spinner)
  }

  

  async getSituations(){
    this.showSpinner(SpinnerType.ballBeat);
    const allPhoneSituations : {totalCount : number , phoneSituation : ListPhoneSituation[]} = await this.phoneSituationService.listPhoneSituation
    (this.paginator ? this.paginator.pageIndex : 0 , this.paginator ? this.paginator.pageSize : 5, () => {
      errorMesage => this.alertifyService.message(errorMesage,{
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      })
    })
    this.dataSource = new MatTableDataSource<ListPhoneSituation>(allPhoneSituations.phoneSituation);
    this.paginator.length = allPhoneSituations.totalCount;
  }

  async ngOnInit() {
    await this.getSituations();
  }
  async pageChanged(){
    await this.getSituations();
  }

}
