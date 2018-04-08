import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password: string;
  cpassword: string;
  token: string;
  error: string;
  success: boolean;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  submit() {
    this.success = false;
    this.error = '';

    this.api.resetPsw(this.token, this.password).subscribe(
      data => {
        if (data.success) {
          this.success = true;
        }
        else {
          console.log(data);
          this.error = data.msg;
        }
      },
      err => {
        console.log(err);
        this.error = 'Connection failed';
      }
    );
  }
}
