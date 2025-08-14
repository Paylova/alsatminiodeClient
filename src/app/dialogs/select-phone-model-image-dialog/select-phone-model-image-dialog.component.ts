import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListPhoneModelImage } from 'src/app/contracts/list-phone-model-image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { PhonemodelService } from 'src/app/services/common/models/phonemodel.service';
import { Basedialog } from '../base/basedialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $ : any;

@Component({
  selector: 'app-select-phone-model-image-dialog',
  templateUrl: './select-phone-model-image-dialog.component.html',
  styleUrls: ['./select-phone-model-image-dialog.component.scss']
})
export class SelectPhoneModelImageDialogComponent extends Basedialog<SelectPhoneModelImageDialogComponent> implements OnInit {

  constructor(dialogRef : MatDialogRef<SelectPhoneModelImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : SelectPhoneModelImageState | string,
  private phoneModelService : PhonemodelService, private spinnerService : NgxSpinnerService, private dialogService : DialogService ) {
    super(dialogRef)
   }

   

   @Output() options : Partial<FileUploadOptions> = {
    accept : ".png, .jpg, .jpeg, .gif, .webp",
    action : "Upload",
    controller : "PhoneModel",
    explanation : "Ürün resmini seçin veya sürükleyin...",
    isAdminPage : true,
    queryString : `id=${this.data}`
   }

   images : ListPhoneModelImage[];

  async ngOnInit() {
    //this.spinnerService.show(SpinnerType.ballBeat);
     this.images = await this.phoneModelService.readImages(this.data as string);
   }

   async deleteImage(imageId : string){

    this.dialogService.openDialog({
      componentType : DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed : async () => {
        this.spinnerService.show(SpinnerType.ballBeat)
        await this.phoneModelService.deleteImage(this.data as string,imageId);
      }
    })
 
   }

}


export enum SelectPhoneModelImageState{
  Close
}
