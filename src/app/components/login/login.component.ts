import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, NotificationService } from 'app/services';
import { SuperAdminApiService } from 'app/super-admin/super-admin-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailOrPhone: string;
  password: string;

  isSuperAdmin = false;

  constructor(private api: ApiService,
    private superAdminApi: SuperAdminApiService,
    private router: Router,
    private notifications: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { superAdmin: boolean }) => {
      this.isSuperAdmin = data.superAdmin;
    });
  }

  submit() {
    if (this.isSuperAdmin) {
      this.superAdminApi.login(this.emailOrPhone, this.password).subscribe(
        data => {
          if (data.success) {
            this.router.navigateByUrl('/superadmin/dashboard');
          }
          else {
            console.log(data);
  
            this.notifications.show(data.msg);
          }
        }
      );
    }
    else {
      this.api.login(this.emailOrPhone, this.password).subscribe(
        data => {
          if (data.success) {
            this.router.navigateByUrl('/dashboard');
          }
          else {
            console.log(data);

            this.notifications.show(data.msg);
          }
        }
      );
    }
  }
}
