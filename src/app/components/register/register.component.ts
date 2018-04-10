import { Component, OnInit, HostBinding } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { routerAnimation } from '../../animations';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  animations: [routerAnimation],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  name: string;
  email: string;
  acceptTnC: boolean;

  constructor(private api: ApiService, private router: Router, private notifications: NotificationService) { }

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
      },
      err => {
        this.notifications.show("Connection failed");
        console.log(err);
      }
    );
  }
}
