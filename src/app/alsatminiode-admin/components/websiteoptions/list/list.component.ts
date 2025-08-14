import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListWebsiteOption } from 'src/app/contracts/list-website-option';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { WebsiteoptionService } from 'src/app/services/common/models/websiteoption.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private wbOptionService : WebsiteoptionService, private alertifyService : AlertifyService) {
    super(spinner)
   }

  displayedColumns : string[] = ['mailHost','mailUsername','mailPort','mailReplyMail','giftCouponRate','createdDate','updatedDate','deleteColumn'];
  dataSource : MatTableDataSource<ListWebsiteOption> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  async getOptions(){
    this.showSpinner(SpinnerType.ballBeat)
    const allOptions : {totalCount : number, option : ListWebsiteOption[]} = await this.wbOptionService.listOption
    (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.ballBeat),
    errorMesage => this.alertifyService.message(errorMesage,{
      dismissOthers : true,
      messageType : MessageType.Error,
      position : Position.BottomCenter
    }))
    this.dataSource = new MatTableDataSource<ListWebsiteOption>(allOptions.option);
    this.paginator.length = allOptions.totalCount;
  }

  async pageChanged(){
    //await this.getOptions();
  }
  
   async ngOnInit() {
     //await this.getOptions();
  }


}
