import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-forgot-psw',
  templateUrl: './forgot-psw.component.html',
  styleUrls: ['./forgot-psw.component.css']
})
export class ForgotPswComponent implements OnInit {

  email: string;
  error: string;
  success: boolean;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  submit() {
    this.success = false;
    this.error = '';

    this.api.resetPsw(this.email).subscribe(
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
