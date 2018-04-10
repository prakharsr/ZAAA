import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-change-psw',
  templateUrl: './change-psw.component.html',
  styleUrls: ['./change-psw.component.css']
})
export class ChangePswComponent implements OnInit {

  oldPassword: string;
  password: string;
  cpassword: string;

  constructor(private api: ApiService, private notifications: NotificationService) { }

  ngOnInit() {
  }

  submit() {
    this.api.changePassword(this.oldPassword, this.password).subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Password changed successfully');
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
