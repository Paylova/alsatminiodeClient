import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadDialogComponent
     
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
    
  ],
  exports : [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
