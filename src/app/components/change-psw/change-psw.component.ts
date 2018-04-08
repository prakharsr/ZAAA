import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-change-psw',
  templateUrl: './change-psw.component.html',
  styleUrls: ['./change-psw.component.css']
})
export class ChangePswComponent implements OnInit {

  oldPassword: string;
  password: string;
  cpassword: string;
  error: string;
  success: boolean;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  submit() {
    this.error = '';
    this.success = false;

    this.api.changePassword(this.oldPassword, this.password).subscribe(
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
