import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Basedialog } from '../base/basedialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent extends Basedialog<DeleteDialogComponent>{

  constructor(
    dialogRef : MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : DeleteState,
    
  ) { super(dialogRef)}

}
export enum DeleteState{
  Yes,
  No
}

