import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailOrPhone: string;
  password: string;

  error: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  submit() {
    this.error = '';

    this.api.login(this.emailOrPhone, this.password).subscribe(
      data => {
        if (data.success) {
          this.error = "Successfull";
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
