import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCountry } from 'src/app/contracts/list-country';
import { CountryUpdateDialogComponent } from 'src/app/dialogs/country-update-dialog/country-update-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CountryService } from 'src/app/services/common/models/country.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns : string[] = ['countryName','createdDate','updatedDate','deleteColumn','updateColumn'];
  dataSource : MatTableDataSource<ListCountry> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(spinner : NgxSpinnerService, 
    private countryService : CountryService, 
    private alertifyService : AlertifyService,private dialogService : DialogService,
    ) { 
    super(spinner)
  }



  async getCountries(){
    this.showSpinner(SpinnerType.ballBeat);
    const allCountries : {totalCount : number, country : ListCountry[]} = await this.countryService.listCountry
    (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.ballBeat),
    erorrMesage => this.alertifyService.message(erorrMesage,{
      dismissOthers : true,
      messageType : MessageType.Error,
      position : Position.BottomCenter
    }))
    this.dataSource = new MatTableDataSource<ListCountry>(allCountries.country);
    this.paginator.length = allCountries.totalCount;
    
  }

  async ngOnInit() {
    await this.getCountries();
  }
  async pageChanged(){
    await this.getCountries();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  showCountryDetail(id : string){
    this.dialogService.openDialog({
      componentType : CountryUpdateDialogComponent,
      data : id,
      options: {
        width : "100%"
      }
    })
  }

}
