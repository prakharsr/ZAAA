import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private api: ApiService) { }

  list = [];

  ngOnInit() {
    this.api.notifications.subscribe(data => {
      if (data.success) {
        this.list = data.notifications;
      }
    });
  }

}
