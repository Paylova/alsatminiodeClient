import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateAdmin } from 'src/app/contracts/create-admin';
import { CreateUser } from 'src/app/contracts/create-user';
import { User } from 'src/app/entities/user';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AdminService } from 'src/app/services/common/models/admin.service';
import { UserService } from 'src/app/services/common/models/user.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  frm : FormGroup;
  submitted : boolean = false;
  constructor(spinner : NgxSpinnerService,private adminService : AdminService, private alertify : AlertifyService, private formBuilder : FormBuilder,private userService : UserService) { 
    super(spinner)
  }
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      adminName : ["",[Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      adminSurname : ["",[Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      adminUsername : ["",[Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      adminPassword : ["",[Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      adminGSM : ["",[Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      adminEMail : ["",[Validators.required, Validators.maxLength(250), Validators.minLength(3),Validators.email]]
    }, {
      validators : (group : AbstractControl) : ValidationErrors | null =>  {
        return null;
    }})
  }

  get component(){
    return this.frm.controls;
  }

  async onSubmit(user : User){
    this.submitted = true;
    if(this.frm.invalid)
      return;

   const result : CreateUser = await this.userService.create(user);
   if(result.succeeded)
    this.alertify.message(result.message,{
      dismissOthers : true,
      messageType : MessageType.Success,
      position : Position.BottomCenter
    })
    else
    this.alertify.message(result.message,{
      dismissOthers : true,
      messageType : MessageType.Error,
      position : Position.BottomCenter
    })
  }



  @Output() createdAdmin : EventEmitter<CreateAdmin> = new EventEmitter();
  create (adminName : HTMLInputElement,adminSurname : HTMLInputElement,adminUsername : HTMLInputElement,adminPassword : HTMLInputElement,adminGSM : HTMLInputElement,adminMail : HTMLInputElement){
    this.showSpinner(SpinnerType.ballBeat);
    const create_admin : CreateAdmin = new CreateAdmin();
    create_admin.adminName = adminName.value;
    create_admin.adminSurname = adminSurname.value;
    create_admin.adminUsername = adminUsername.value;
    create_admin.adminPassword = adminPassword.value;
    create_admin.adminGSM = adminGSM.value;
    create_admin.adminMail = adminMail.value;
    
    this.adminService.createAdmin(create_admin, ()=> {
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertify.message("Admin başarıyla eklenmiştir.",{
        dismissOthers : true,
        messageType : MessageType.Success,
        position : Position.BottomCenter
      });
      this.createdAdmin.emit(create_admin);      
    },errorMesage => {
      this.hideSpinner(SpinnerType.ballBeat)
      this.alertify.message(errorMesage,{
        dismissOthers:true,
        messageType : MessageType.Error,
        position : Position.BottomCenter
      });
    });
  }
}

