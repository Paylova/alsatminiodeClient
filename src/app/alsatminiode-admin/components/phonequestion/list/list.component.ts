import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListPhoneQuestion } from 'src/app/contracts/list-phone-question';
import { PhoneQuestionUpdateDialogComponent } from 'src/app/dialogs/phone-question-update-dialog/phone-question-update-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { PhonequestionService } from 'src/app/services/common/models/phonequestion.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns : string[] = ['questionText','createdDate','updatedDate','updateColumn'];
  dataSource : MatTableDataSource<ListPhoneQuestion> = null;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(spinner : NgxSpinnerService, private phoneQuestionService : PhonequestionService,private alertifyService : AlertifyService,private dialogService : DialogService) { 
    super(spinner)
  }


  async getPhoneQuestions(){
    this.showSpinner(SpinnerType.ballBeat);
    const allPhoneQuestions : {totalCount : number, phonequestion : ListPhoneQuestion[]} = await this.phoneQuestionService.listPhoneQuestion
    (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 8,() => this.hideSpinner(SpinnerType.ballBeat),
    errorMessage => this.alertifyService.message(errorMessage,{
      dismissOthers : true,
      messageType : MessageType.Error,
      position  : Position.BottomCenter
    }))
    this.dataSource = new MatTableDataSource<ListPhoneQuestion>(allPhoneQuestions.phonequestion);
    this.paginator.length = allPhoneQuestions.totalCount;
  }



  async pageChanged(){
    await this.getPhoneQuestions();
  }

  async ngOnInit() {
    await this.getPhoneQuestions();
  }

  showPhoneQuestionDetails(id : string){
    this.dialogService.openDialog({
      componentType : PhoneQuestionUpdateDialogComponent,
      data : id,
      options: {
        width : "100%"
      }
    })
  }

}
