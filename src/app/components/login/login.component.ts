import { Component, OnInit, HostBinding } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { routerAnimation } from '../../animations';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  animations: [routerAnimation],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  emailOrPhone: string;
  password: string;

  constructor(private api: ApiService, private router: Router, private notifications: NotificationService) { }

  ngOnInit() {
  }

  submit() {
    this.api.login(this.emailOrPhone, this.password).subscribe(
      data => {
        if (data.success) {
          this.router.navigateByUrl('dashboard');
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      },
      err => {
        console.log(err);

        this.notifications.show('Connection failed');
      }
    );
  }
}
