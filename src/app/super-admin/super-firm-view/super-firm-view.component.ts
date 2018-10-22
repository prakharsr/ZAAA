import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuperAdminApiService } from '../super-admin-api.service';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-super-firm-view',
  templateUrl: './super-firm-view.component.html',
  styleUrls: ['./super-firm-view.component.css']
})
export class SuperFirmViewComponent implements OnInit {

  firm: any = {};
  users = [];
  admins = [];
  maxUsers = 0;
  maxAdmins = 0;

  constructor(private route: ActivatedRoute,
    private api: SuperAdminApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.api.firmData(params.get('id')).subscribe(data => {
        if (data.success) {
          this.firm = data.firm;
          data.users.forEach(element => {
            if (element.isAdmin) {
              this.admins.push(element);
            }
            else this.users.push(element);
          });;

          if (data.max_users) {
            this.maxUsers = data.max_users;
          }

          if (data.max_admins) {
            this.maxAdmins = data.max_admins;
          }
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      });
    });
  }
  
  setFirmStatus(status: number) {
    this.api.setFirmStatus(this.firm._id, status).subscribe(data => {
      if (data.success) {
        this.firm.FirmStatus = status;
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }
}
