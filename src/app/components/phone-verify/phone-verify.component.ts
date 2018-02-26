import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.component.html',
  styleUrls: ['./phone-verify.component.css']
})
export class PhoneVerifyComponent implements OnInit {

  otpSent : boolean;
  number: string;
  otp: string;

  @Output() done = new EventEmitter();

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  sendOtp() : void
  {
    this.api.setMobile(this.number).subscribe(
      data => {
        if (data.success) {
          this.otpSent = true;
        }
        else console.log(data);
      },
      err => console.log(err)
    )
  }

  verifyOtp() : void
  {
    this.api.verifyOtp(this.otp).subscribe(
      data => {
        if (data.success) {
          this.done.emit();
        }
        else console.log(data);
      },
      err => console.log(err)
    );
  }
}
