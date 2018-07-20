import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export class LoginData {
  emailOrPhone: string;
  password: string;
}

@Component({
  selector: 'app-commonlogin',
  templateUrl: './commonlogin.component.html',
  styleUrls: ['./commonlogin.component.css']
})
export class CommonLoginComponent implements OnInit {

  data = new LoginData();

  @Output() submit = new EventEmitter<LoginData>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submit.emit(this.data);
  }
}
