import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCustomer } from 'src/app/contracts/list-customer';
import { ListPhoneSituation } from 'src/app/contracts/list-phone-situation';
import { CustomerInfoDialogComponent } from 'src/app/dialogs/customer-info-dialog/customer-info-dialog.component';
import { UpdatePhoneSituationDialogComponent } from 'src/app/dialogs/update-phone-situation-dialog/update-phone-situation-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CustomerService } from 'src/app/services/common/models/customer.service';
import { PhonesituationService } from 'src/app/services/common/models/phonesituation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns : string[] = ['customerName','customerSurname','customerGSM','customerPhoneIMEI','customerPaymentChoose','brandName','modelName','createdDate','phoneSituation','updateColumn','phoneStiuationUpdate','deleteColumn']
  dataSource : MatTableDataSource<ListCustomer> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  listOfPhoneSituations : Array<ListPhoneSituation> = null
  defaultSituation : string;
  
  constructor(spinner : NgxSpinnerService,private customerService : CustomerService,private alertifyService : AlertifyService,private dialogService : DialogService, private phoneSituationService : PhonesituationService ) {
    super(spinner)
   }

   async getCustomers(){
    this.showSpinner(SpinnerType.ballBeat);
    const allCustomers : {totalCount : number,customer : ListCustomer[]} = await this.customerService.listCustomers
    (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 20,() => this.hideSpinner(SpinnerType.ballBeat),
    errorMesage => this.alertifyService.message(errorMesage,{
      dismissOthers : true,
      messageType : MessageType.Error,
      position : Position.BottomCenter
    }))
    this.dataSource = new MatTableDataSource<ListCustomer>(allCustomers.customer);
    this.paginator.length = allCustomers.totalCount;
   }

   async getSituations(){
    const allSituations : {phoneSituation : ListPhoneSituation[]} = await this.phoneSituationService.getSituations();
    this.listOfPhoneSituations = allSituations.phoneSituation;
    this.defaultSituation = this.listOfPhoneSituations[0].phoneSituation;
   }
  
  async pageChanged(){
    await this.getCustomers();
  }
  async ngOnInit() {
    await this.getCustomers();
    await this.getSituations();

  }
  async onNgModelChange(event){

  }


  showCustomerDetails(id : string){
    this.dialogService.openDialog({
      componentType : CustomerInfoDialogComponent,
      data : id,
      options : {
        width : "100%"
      }
    })
  }
  updatePhoneSituationDetail(id : string){
    this.dialogService.openDialog({
      componentType : UpdatePhoneSituationDialogComponent,
      data : id,
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
