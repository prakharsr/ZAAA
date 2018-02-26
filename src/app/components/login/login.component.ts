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

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  submit() {
    this.api.login(this.emailOrPhone, this.password);
  }
}
