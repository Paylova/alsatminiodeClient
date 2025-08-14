import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListPhoneModelCapacity } from 'src/app/contracts/list-phone-model-capacity';
import { UpdatePhoneModelCapacityComponent } from 'src/app/dialogs/update-phone-model-capacity/update-phone-model-capacity.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { PhonemodelcapacityService } from 'src/app/services/common/models/phonemodelcapacity.service';




declare var $ : any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private phoneModelCapacityService : PhonemodelcapacityService, private alertifyService : AlertifyService,private dialogService : DialogService) {
    super(spinner)
   }
  
  displayedColumns : string[] = ['phoneModelCapacityName','phoneModelCapacityPrice','modelName','createdDate','updatedDate','updateColumn'];
  dataSource : MatTableDataSource<ListPhoneModelCapacity> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;


  async getPhoneModelCapacity(){
    this.showSpinner(SpinnerType.ballBeat);
   const allPhoneModelCapacity : {totalCount : number, phoneModelCapacity : ListPhoneModelCapacity[]} = await this.phoneModelCapacityService.listPhoneModelCapacity
   (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, ()=> this.hideSpinner(SpinnerType.ballBeat),
   errorMesage => this.alertifyService.message(errorMesage,{
    dismissOthers : true,
    messageType : MessageType.Error,
    position : Position.BottomCenter
   }))
   this.dataSource = new MatTableDataSource<ListPhoneModelCapacity>(allPhoneModelCapacity.phoneModelCapacity);
   this.paginator.length = allPhoneModelCapacity.totalCount;
  }


  async pageChanged(){
    await this.getPhoneModelCapacity();
  }
  async ngOnInit() {
    await this.getPhoneModelCapacity();
  }
  editPhoneModelCapacity(id : string){
    this.dialogService.openDialog({
      componentType : UpdatePhoneModelCapacityComponent,
      data: id,
      options : {
        width : "100%"
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
