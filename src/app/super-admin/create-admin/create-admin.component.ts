import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../super-admin-api.service';
import { NotificationService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  name = "";
  email = "";
  password = "";

  constructor(private api: SuperAdminApiService,
    private notification: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.api.signup(this.name, this.email, this.password).subscribe(data => {
      if (data.success) {
        this.router.navigateByUrl('/superadmin/admins');
      }
      else {
        console.log(data);

        this.notification.show(data.msg);
      }
    });
  }
}
