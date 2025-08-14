import { Component, EventEmitter, OnInit, Output, ViewChild,Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListPhoneModel } from 'src/app/contracts/list-phone-model';
import { PhoneQuestionDialogComponent } from 'src/app/dialogs/phone-question-dialog/phone-question-dialog.component';
import { SelectPhoneModelImageDialogComponent } from 'src/app/dialogs/select-phone-model-image-dialog/select-phone-model-image-dialog.component';
import { UpdatePhoneModelComponent } from 'src/app/dialogs/update-phone-model/update-phone-model.component';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { PhonemodelService } from 'src/app/services/common/models/phonemodel.service';

declare var $ : any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private phoneModelsService : PhonemodelService,private alertifyService : AlertifyService,private dialogService : DialogService) { 
    super(spinner)
  }
  displayedColumns : string[] = ['modelName' ,'modelFirstPrice','modelLastPrice','brandName', 'createdDate','updatedDate','deleteColumn','updateColumn','updateColumn-Phone','photoColumn']
  dataSource : MatTableDataSource<ListPhoneModel> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  async getPhoneModels(){
    this.showSpinner(SpinnerType.ballBeat);
    const allPhoneModels : {totalCount : number, phoneModel : ListPhoneModel[]} = await this.phoneModelsService.listPhoneModel
    (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 100, ()=> this.hideSpinner(SpinnerType.ballBeat),
    errorMesage => this.alertifyService.message(errorMesage,{
      dismissOthers : true,
      messageType : MessageType.Error,
      position : Position.BottomCenter
    }))
    this.dataSource = new MatTableDataSource<ListPhoneModel>(allPhoneModels.phoneModel)
    this.paginator.length = allPhoneModels.totalCount;
  }

  async pageChanged(){
    await this.getPhoneModels();
  }
  async ngOnInit() {
    await this.getPhoneModels();
  }

  editPhoneQuestion(id : string){
    this.dialogService.openDialog({
      componentType : PhoneQuestionDialogComponent,
      data: id,
      options : {
        width : "100%"
      }
    })
  }
  editPhoneModel(id : string){
    this.dialogService.openDialog({
      componentType : UpdatePhoneModelComponent,
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
  modelImages(id : string){
    this.dialogService.openDialog({
      componentType : SelectPhoneModelImageDialogComponent,
      data : id,
      options : {
        width : "100%"
      }
    })
  }

}


