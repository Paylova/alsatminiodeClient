import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent,DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $ : any
@Directive({
  selector: '[appDeleteBrand]'
})
export class DeleteBrandDirective {

  constructor(private element : ElementRef, private _renderer : Renderer2,private httpClientService : HttpClientService, private spinner : NgxSpinnerService,
    public dialog : MatDialog,private alertifyService : AlertifyService,private dialogService : DialogService) { 
      const icon = _renderer.createElement("span");
      icon.className= "material-icons";
      icon.appendChild(document.createTextNode("delete"));
      icon.setAttribute("style","cursor: pointer;");
      _renderer.appendChild(element.nativeElement, icon);
    }

    @Input() id : string;
    @Input() controller : string;
    @Output() callback : EventEmitter<any> = new EventEmitter();

    @HostListener("click")

    async onclick(){
      //this.spinner.show(SpinnerType.ballBeat);
      this.dialogService.openDialog({
        componentType : DeleteDialogComponent,
        data : DeleteState.Yes,
        afterClosed : async () => {
         const td : HTMLTableCellElement = this.element.nativeElement;
         this.httpClientService.delete({
           controller : this.controller
         },this.id).subscribe(data => {
           $(td.parentElement).fadeOut(
           700 ,() => {
             this.callback.emit();
             this.alertifyService.message("Başarıyla Silinmiştir.",{
               dismissOthers : false,
               messageType : MessageType.Success,
               position : Position.BottomCenter
             });
           });
         },(errorResponse : HttpErrorResponse) =>{
           this.spinner.hide(SpinnerType.ballBeat);
           this.alertifyService.message("Silinirken Hata Oluştu.",{
             dismissOthers:false,
             messageType : MessageType.Error,
             position : Position.BottomCenter
           });   
         });  
        }
      });
    }

}
