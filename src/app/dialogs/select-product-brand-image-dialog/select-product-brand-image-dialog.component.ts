import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListPhoneBrandImage } from 'src/app/contracts/list-phone-brand-image';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { PhonebrandService } from 'src/app/services/common/models/phonebrand.service';
import { Basedialog } from '../base/basedialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';


declare var $ : any;
@Component({
  selector: 'app-select-product-brand-image-dialog',
  templateUrl: './select-product-brand-image-dialog.component.html',
  styleUrls: ['./select-product-brand-image-dialog.component.scss']
})
export class SelectProductBrandImageDialogComponent extends Basedialog<SelectProductBrandImageDialogComponent> implements OnInit {

  constructor(dialogRef : MatDialogRef<SelectProductBrandImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : SelectProductBrandImageState | string
  ,private phoneBrandService : PhonebrandService,private dialogService : DialogService,private spinnerService : NgxSpinnerService) {
    super(dialogRef)
   }

   @Output() options : Partial<FileUploadOptions> ={
    accept : ".png, .jpg, .jpeg, .gif, .webp",
    action : "Upload",
    controller : "PhoneBrand",
    explanation : "Ürün resmini seçin veya sürükleyin...",
    isAdminPage : true,
    queryString : `id=${this.data}`
   }
   images : ListPhoneBrandImage[];
   async ngOnInit() {
     this.images = await this.phoneBrandService.readImages(this.data as string);
     console.log(this.images)

   }

  async deleteImage(imageId : string, event : any){
    this.dialogService.openDialog({
      componentType : DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed: async () => {
        this.spinnerService.show(SpinnerType.ballBeat)
        await this.phoneBrandService.deleteImage(this.data as string,imageId, () => {
          this.spinnerService.hide(SpinnerType.ballBeat)
          var card = $(event.srcElement).parent().parent();
          debugger;
          card.fadeOut(500);
        })
      }
    })

   }
}

export enum SelectProductBrandImageState{
  Close
}
