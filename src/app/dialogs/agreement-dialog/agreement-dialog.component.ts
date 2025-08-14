import { Component, OnInit } from '@angular/core';

declare var $ : any
@Component({
  selector: 'app-agreement-dialog',
  templateUrl: './agreement-dialog.component.html',
  styleUrls: ['./agreement-dialog.component.scss']
})


export class AgreementDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isDisabled : boolean = false;
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.isDisabled = true;
    }
}

}
