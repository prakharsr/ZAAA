import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  cpassword: string;
  error: string;

  @Output() done = new EventEmitter();

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  submit()
  {
    this.error = '';

    this.api.signup(this.name, this.email, this.password).subscribe(
      data => {
        if (data.success) {
          this.api.sendVerificationMail();

          this.done.emit();
        }
        else {
          console.log(data);

          this.error = data.msg;
        }
      },
      err => {
        this.error = "Connection failed";
        console.log(err);
      }
    );
  }
}
