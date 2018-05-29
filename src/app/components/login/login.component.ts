import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, NotificationService } from 'app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailOrPhone: string;
  password: string;

  hidePassword = true;

  constructor(private api: ApiService,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
  }

  submit() {
    this.api.login(this.emailOrPhone, this.password).subscribe(
      data => {
        if (data.success) {
          this.router.navigateByUrl('profile');
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }
}
