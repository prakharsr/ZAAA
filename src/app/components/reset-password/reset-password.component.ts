import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@aaman/main/api.service';
import { NotificationService } from '@aaman/main/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password: string;
  cpassword: string;
  token: string;

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  submit() {
    this.api.resetPsw(this.token, this.password).subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Password Changed Successfully.');
        }
        else {
          console.log(data);
          this.notifications.show(data.msg);
        }
      }
    );
  }
}
