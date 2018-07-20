import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, NotificationService } from 'app/services';
import { LoginData } from '../commonlogin/commonlogin.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private api: ApiService,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
  }

  submit(data: LoginData) {
    this.api.login(data.emailOrPhone, data.password).subscribe(
      data => {
        if (data.success) {
          this.router.navigateByUrl('dashboard');
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }
}
