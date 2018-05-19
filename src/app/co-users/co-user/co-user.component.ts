import { Component, OnInit, ViewChild } from '@angular/core';
import { CoUser } from '../co-user';
import { UserRoles } from '../user-roles';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CoUserApiService } from '../co-user-api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-co-user',
  templateUrl: './co-user.component.html',
  styleUrls: ['./co-user.component.css']
})
export class CoUserComponent implements OnInit {

  coUser = new CoUser();

  constructor(private api: CoUserApiService, private router: Router, private notifications: NotificationService) { }

  ngOnInit() {
  }

  private navigateBack() {
    this.router.navigateByUrl('/coUsers');
  }

  submit() {
    this.api.createCoUser(this.coUser).subscribe(
      data => {
        if (data.success)
        {
          this.coUser.id = data.msg;

          if (!this.coUser.isAdmin) {
            this.api.setRoles(this.coUser.id, this.coUser.roles).subscribe(d => {
              if (d.success) {
                this.navigateBack();
              }
              else {
                console.log(d);

                this.notifications.show(d.msg);
              }
            });
          }
          else this.navigateBack();
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }

  onCancel() {
    this.navigateBack();
  }
}
