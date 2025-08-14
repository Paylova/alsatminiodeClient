import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../base/base.component';
import { UserService } from '../services/common/models/user.service';

@Component({
  selector: 'app-alsatminiode-login',
  templateUrl: './alsatminiode-login.component.html',
  styleUrls: ['./alsatminiode-login.component.scss']
})

export class AlsatminiodeLoginComponent extends BaseComponent implements OnInit {

  

  constructor(spinner : NgxSpinnerService,private userService : UserService,private router : Router) {
    super(spinner)
   }

  ngOnInit(): void {
  }

  async login(UsernameOrEmail : string,Password : string){
    this.showSpinner(SpinnerType.ballBeat);
   await this.userService.login(UsernameOrEmail,Password,() => this.router.navigate(["alsatminiode-admin"]));
  }




}
