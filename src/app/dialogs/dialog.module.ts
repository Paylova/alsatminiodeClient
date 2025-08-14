import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectPhoneModelImageDialogComponent } from './select-phone-model-image-dialog/select-phone-model-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { PhoneQuestionDialogComponent } from './phone-question-dialog/phone-question-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PhonemodelsModule } from '../alsatminiode-admin/components/phonemodels/phonemodels.module';
import { AgreementDialogComponent } from './agreement-dialog/agreement-dialog.component';
import { ProtectionOfPersonalDataComponent } from './protection-of-personal-data/protection-of-personal-data.component';
import { CustomerInfoDialogComponent } from './customer-info-dialog/customer-info-dialog.component';
import { CustomerSuccessDialogComponent } from './customer-success-dialog/customer-success-dialog.component';
import { CountryUpdateDialogComponent } from './country-update-dialog/country-update-dialog.component';
import { CityUpdateDialogComponent } from './city-update-dialog/city-update-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { PhoneQuestionUpdateDialogComponent } from './phone-question-update-dialog/phone-question-update-dialog.component';
import { SelectProductBrandImageDialogComponent } from './select-product-brand-image-dialog/select-product-brand-image-dialog.component';
import { UpdatePhoneModelComponent } from './update-phone-model/update-phone-model.component';
import { UpdatePhoneSituationDialogComponent } from './update-phone-situation-dialog/update-phone-situation-dialog.component';
import { SelectShippingCompanyImageFileDialogComponent } from './select-shipping-company-image-file-dialog/select-shipping-company-image-file-dialog.component';
import { UpdatePhoneModelCapacityComponent } from './update-phone-model-capacity/update-phone-model-capacity.component';
import { SendSmsDialogComponent } from './send-sms-dialog/send-sms-dialog.component';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectPhoneModelImageDialogComponent,
    PhoneQuestionDialogComponent,
    AgreementDialogComponent,
    ProtectionOfPersonalDataComponent,
    CustomerInfoDialogComponent,
    CustomerSuccessDialogComponent,
    CountryUpdateDialogComponent,
    CityUpdateDialogComponent,
    PhoneQuestionUpdateDialogComponent,
    SelectProductBrandImageDialogComponent,
    UpdatePhoneModelComponent,
    UpdatePhoneSituationDialogComponent,
    SelectShippingCompanyImageFileDialogComponent,
    UpdatePhoneModelCapacityComponent,
    SendSmsDialogComponent

    
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,FormsModule,

  ],
  exports : [
    PhoneQuestionDialogComponent   
  ]
})
export class DialogModule { }
