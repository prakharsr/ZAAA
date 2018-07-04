import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, NotificationService } from 'app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  acceptTnC: boolean;

  emailOrPhone: string;
  password: string;

  hidePassword = true;

  constructor(private api: ApiService,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() { }

  GoToDashboard() : void {
    this.router.navigateByUrl('/dashboard');
  }

  submit()
  {
    this.api.signup(this.name, this.email).subscribe(
      data => {
        if (data.success) {
          this.GoToDashboard();
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }

  loginSubmit() {
    this.api.login(this.emailOrPhone, this.password).subscribe(
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
