import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Basedialog } from '../base/basedialog';

@Component({
  selector: 'app-send-sms-dialog',
  templateUrl: './send-sms-dialog.component.html',
  styleUrls: ['./send-sms-dialog.component.scss']
})
export class SendSmsDialogComponent extends Basedialog<SendSmsDialogComponent> {

  constructor(dialogRef : MatDialogRef<SendSmsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : SendSmsDialogState) { 
    super(dialogRef)
  }
}
export enum SendSmsDialogState{
  Yes,
  No
}
