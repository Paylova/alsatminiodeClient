import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCity } from 'src/app/contracts/list-city';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CityService } from 'src/app/services/common/models/city.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CityUpdateDialogComponent } from 'src/app/dialogs/city-update-dialog/city-update-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns : string[] = ['cityName','countryName','createdDate','updatedDate','deleteColumn','updateColumn'];
  dataSource : MatTableDataSource<ListCity> = null;
  constructor(spinner : NgxSpinnerService,private cityService : CityService,private alertifyService : AlertifyService, private dialogService : DialogService) { 
    super(spinner)
  }


  @ViewChild(MatPaginator) paginator : MatPaginator;

  async getCities(){
    this.showSpinner(SpinnerType.ballBeat);
    const allCities : {totalCount : number, city : ListCity[]} = await this.cityService.listCity
    (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, ()=> this.hideSpinner(SpinnerType.ballBeat),
    errorMesage => this.alertifyService.message(errorMesage,{
      dismissOthers : true,
      messageType : MessageType.Error,
      position : Position.BottomCenter
    }))
    this.dataSource = new MatTableDataSource<ListCity>(allCities.city);
    this.paginator.length = allCities.totalCount;
  }
  async pageChanged(){
    await this.getCities();
  }
  async ngOnInit() {
    await this.getCities();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showCityDetail(id : string){
    this.dialogService.openDialog({
      componentType : CityUpdateDialogComponent,
      data : id,
      options: {
        width : "100%"
      }
    })
  }

}
