import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-forgot-psw',
  templateUrl: './forgot-psw.component.html',
  styleUrls: ['./forgot-psw.component.css']
})
export class ForgotPswComponent implements OnInit {

  email: string;

  constructor(private api: ApiService, private notifications: NotificationService) { }

  ngOnInit() {
  }

  submit() {
    this.api.forgotPsw(this.email).subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Password Reset Email sent.');
        }
        else {
          console.log(data);
          this.notifications.show(data.msg);
        }
      }
    );
  }
}
