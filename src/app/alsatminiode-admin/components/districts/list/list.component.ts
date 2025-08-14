import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListDistrict } from 'src/app/contracts/list-district';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DistrictService } from 'src/app/services/common/models/district.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns : string[] = ['districtName','cityName','countryName','createdDate','updatedDate','deleteColumn','updateColumn']
  dataSource : MatTableDataSource<ListDistrict> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(spinner : NgxSpinnerService,private districtService : DistrictService, private alertifyService : AlertifyService) {
    super(spinner)
   }



   async getDistricts(){
    this.showSpinner(SpinnerType.ballBeat);
    const allDistricts : {totalCount : number, district : ListDistrict[]} = await this.districtService.listDistrict
    (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,()=> this.hideSpinner(SpinnerType.ballBeat),
    errorMessage=> this.alertifyService.message(errorMessage,{
      dismissOthers:true,
      messageType : MessageType.Error,
      position : Position.BottomCenter
    }))
    this.dataSource = new MatTableDataSource<ListDistrict>(allDistricts.district);
    this.paginator.length = allDistricts.totalCount;
   }
  


  async ngOnInit() {
    await this.getDistricts();
  }
  async pageChanged(){
    await this.getDistricts();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
