import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListAdmin } from 'src/app/contracts/list-admin';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AdminService } from 'src/app/services/common/models/admin.service';

declare var $ : any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns : string[] = ['adminName','adminSurname','adminUsername','adminPassword','adminGSM','adminMail','createdDate','updatedDate','deleteColumn','updateColumn'];
  dataSource : MatTableDataSource<ListAdmin> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  constructor(spinner : NgxSpinnerService,private adminService : AdminService,private alertifyService : AlertifyService) {
    super(spinner)

   }


   async getAdmins(){
    this.showSpinner(SpinnerType.ballBeat);
    const allAdmins : {totalCount : number, admin : ListAdmin[]} = await this.adminService.listAdmin
    (this.paginator ?  this.paginator.pageIndex : 0 ,this.paginator ? this.paginator.pageSize : 5,() => this.hideSpinner(SpinnerType.ballBeat),
    errorMesage => this.alertifyService.message(errorMesage,{
      dismissOthers : true,
      messageType : MessageType.Error,
      position : Position.BottomCenter
    }))
    this.dataSource = new MatTableDataSource<ListAdmin>(allAdmins.admin);
    this.paginator.length = allAdmins.totalCount;
    }

    async pageChanged(){
      await this.getAdmins();
    }
    async ngOnInit() {
      await this.getAdmins();
    }

}





