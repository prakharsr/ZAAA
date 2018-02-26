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

  sendError : string;
  verifyError: string;

  @Output() done = new EventEmitter();

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  sendOtp() : void
  {
    this.sendError = '';

    this.api.setMobile(this.number).subscribe(
      data => {
        if (data.success) {
          this.otpSent = true;
        }
        else {
          console.log(data);

          this.sendError = data.msg;
        }
      },
      err => {
        console.log(err)

        this.sendError = 'Connection failed';
      }
    )
  }

  verifyOtp() : void
  {
    this.verifyError = '';

    this.api.verifyOtp(this.otp).subscribe(
      data => {
        if (data.success) {
          this.done.emit();
        }
        else {
          console.log(data);

          this.verifyError = data.msg;
        }
      },
      err => {
        console.log(err)

        this.verifyError = 'Connection failed';
      }
    );
  }
}
