import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListPhoneBrand } from 'src/app/contracts/list-phone-brand';
import { SelectProductBrandImageDialogComponent } from 'src/app/dialogs/select-product-brand-image-dialog/select-product-brand-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { PhonebrandService } from 'src/app/services/common/models/phonebrand.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private phoneBrandService : PhonebrandService,private alertifyService : AlertifyService,private dialogService : DialogService) { 
    super(spinner)
  }

  displayedColumns : string[] = ['brandName','createdDate','updatedDate','deleteColumn','updateColumn','photoColumn'];
  dataSource : MatTableDataSource<ListPhoneBrand> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  async getPhoneBrands(){
    this.showSpinner(SpinnerType.ballBeat);
    const allPhoneBrand : {totalCount : number, phoneBrand : ListPhoneBrand[]} = await this.phoneBrandService.listPhoneBrand
    (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.ballBeat),
    errorMesage => this.alertifyService.message(errorMesage,{
      dismissOthers : true,
      messageType : MessageType.Error,
      position : Position.BottomCenter
    }))
    this.dataSource = new MatTableDataSource<ListPhoneBrand>(allPhoneBrand.phoneBrand);
    this.paginator.length = allPhoneBrand.totalCount;
  }

  async pageChanged(){
    await this.getPhoneBrands();
  }

  async ngOnInit() {
    await this.getPhoneBrands();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  brandImages(id : string){
    this.dialogService.openDialog({
      componentType : SelectProductBrandImageDialogComponent,
      data : id,
      options : {
        width : "100%"
      }
    })
  }

}

