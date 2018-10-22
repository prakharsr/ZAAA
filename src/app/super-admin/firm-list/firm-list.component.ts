import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../super-admin-api.service';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-firm-list',
  templateUrl: './firm-list.component.html',
  styleUrls: ['./firm-list.component.css']
})
export class FirmListComponent implements OnInit {

  firms;

  constructor(private api: SuperAdminApiService,
    private notifications: NotificationService) {
  }

  ngOnInit() {
    this.api.firms.subscribe(data => {
      if (data.success) {
        this.firms = data.firms;
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }

}
