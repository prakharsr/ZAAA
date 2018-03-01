import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

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

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getUser().subscribe(data => {
      if (!this.number && data.success && data.user.phone) {
        this.number = data.user.phone;
      }
    });
  }

  sendOtp() : void
  {
    this.sendError = '';
    this.otpSent = true;

    this.api.setMobile(this.number).subscribe(
      data => {
        if (!data.success) {
          this.otpSent = false;

          console.log(data);

          this.sendError = data.msg;
        }
      },
      err => {
        this.otpSent = false;

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
          this.router.navigateByUrl('/dashboard');
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
