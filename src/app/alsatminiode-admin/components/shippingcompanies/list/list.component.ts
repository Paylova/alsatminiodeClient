import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListShippingCompany } from 'src/app/contracts/list-shipping-company';
import { SelectShippingCompanyImageFileDialogComponent } from 'src/app/dialogs/select-shipping-company-image-file-dialog/select-shipping-company-image-file-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ShippingcompanyService } from 'src/app/services/common/models/shippingcompany.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns : string[] = ['companyName','companyDealCode','createdDate','updatedDate','photoColumn']
  dataSource : MatTableDataSource<ListShippingCompany> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(spinner : NgxSpinnerService,private shippinCompanyService : ShippingcompanyService,private alertifyService : AlertifyService,private dialogService : DialogService) { 
    super(spinner)
  }

  async getCompanies(){
    this.showSpinner(SpinnerType.ballBeat);
    const allShippingCompanies : {totalCount : number , shippingCompany : ListShippingCompany[]} = await this.shippinCompanyService.listCompany
    (this.paginator ? this.paginator.pageIndex : 0 , this.paginator ? this.paginator.pageSize : 5, () => {
      errorMesage => this.alertifyService.message(errorMesage,{
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      })
    })
    this.dataSource = new MatTableDataSource<ListShippingCompany>(allShippingCompanies.shippingCompany);
    this.paginator.length = allShippingCompanies.totalCount;
  }

  async ngOnInit() {
    await this.getCompanies();
  }
  async pageChanged(){
    await this.getCompanies();
  }

  companyImages(id : string){
    this.dialogService.openDialog({
      componentType : SelectShippingCompanyImageFileDialogComponent,
      data : id,
      options : {
        width : "100%"
      }
    })
  }

}
