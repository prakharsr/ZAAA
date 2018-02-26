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
    this.api.sendOtp(this.number);

    this.otpSent = true;
  }

  verifyOtp() : void
  {
    this.api.verifyOtp(this.otp);

    this.done.emit();
  }
}
