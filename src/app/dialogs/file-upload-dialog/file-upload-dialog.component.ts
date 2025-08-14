import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Basedialog } from '../base/basedialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent extends Basedialog<FileUploadDialogComponent> {
  constructor(dialogRef : MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : FileUploadDialogState){ 
    super(dialogRef)
  }
  


}

export enum FileUploadDialogState{
  Yes,
  No
}
