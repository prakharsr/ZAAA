import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminApiService } from '../super-admin-api.service';
import { NotificationService } from 'app/services';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {

  title = "";
  body = "";

  constructor(private router: Router,
    private api: SuperAdminApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
  }

  submit() {
    this.api.sendNotification(this.title, this.body).subscribe(data => {
      if (data.success) {
        this.notifications.show('Sent Successfully');
        
        this.goBack();
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }

  private goBack() {
    this.router.navigateByUrl('/superadmin');
  }

  cancel() {
    this.goBack();
  }

}
