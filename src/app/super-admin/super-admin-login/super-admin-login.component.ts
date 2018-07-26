import { Component, OnInit } from '@angular/core';
import { LoginData } from '../../components/commonlogin/commonlogin.component';
import { SuperAdminApiService } from '../super-admin-api.service';
import { Router } from '@angular/router';
import { NotificationService } from 'app/services';

@Component({
  selector: 'app-super-admin-login',
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.css']
})
export class SuperAdminLoginComponent implements OnInit {

  constructor(private api: SuperAdminApiService,
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
