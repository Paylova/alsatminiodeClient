import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListShippingCompanyImageFile } from 'src/app/contracts/list-shipping-company-image-file';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ShippingcompanyService } from 'src/app/services/common/models/shippingcompany.service';
import { Basedialog } from '../base/basedialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var $: any
@Component({
  selector: 'app-select-shipping-company-image-file-dialog-component',
  templateUrl: './select-shipping-company-image-file-dialog.component.html',
  styleUrls: ['./select-shipping-company-image-file-dialog.component.scss']
})

export class SelectShippingCompanyImageFileDialogComponent extends Basedialog<SelectShippingCompanyImageFileDialogComponent> implements OnInit {

  constructor(dialogRef : MatDialogRef<SelectShippingCompanyImageFileDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : SelectShippingCompanyImageState | string
  ,private shippingCompanyService : ShippingcompanyService, private dialogService : DialogService,private spinnerService : NgxSpinnerService) { 
    super(dialogRef)
  }


  @Output() options : Partial<FileUploadOptions> = {
    accept : ".webp, .gif",
    action : "Upload",
    controller : "ShippingCompany",
    explanation : "Kargo Firması resmini seçin veya sürükleyin...",
    isAdminPage : true,
    queryString : `id=${this.data}`
  }
  images : ListShippingCompanyImageFile[];
  async ngOnInit() {
    this.images = await this.shippingCompanyService.readImages(this.data as string);
    console.log(this.data as string)
  }

  async deleteImage(imageId: string, event: any) {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinnerService.show(SpinnerType.ballBeat)
        await this.shippingCompanyService.deleteImage(this.data as string, imageId, () => {
          this.spinnerService.hide(SpinnerType.ballBeat);
          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(500);
        });
      }
    })
  }


}
export enum SelectShippingCompanyImageState{
  Close
}