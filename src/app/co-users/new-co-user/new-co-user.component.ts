import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { CoUser } from '../co-user';
import { UserRoles } from '../user-roles';
import { routerAnimation } from '../../animations';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CoUserApiService } from '../co-user-api.service';

@Component({
  selector: 'app-new-co-user',
  animations: [routerAnimation],
  templateUrl: './new-co-user.component.html',
  styleUrls: ['./new-co-user.component.css']
})
export class NewCoUserComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  coUser = new CoUser();

  error: string;

  constructor(private api: CoUserApiService, private router: Router) { }

  ngOnInit() {
  }

  private navigateBack() {
    this.router.navigateByUrl('/coUsers');
  }

  submit() {
    this.error = '';

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

                this.error = d.msg;
              }
            },
            err => {
              console.log(err);

              this.error = 'Connection failed';
            });
          }
        }
        else {
          console.log(data);

          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
      }
    );
  }

  onCancel() {
    this.navigateBack();
  }
}
