import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protection-of-personal-data',
  templateUrl: './protection-of-personal-data.component.html',
  styleUrls: ['./protection-of-personal-data.component.scss']
})
export class ProtectionOfPersonalDataComponent implements OnInit {

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
