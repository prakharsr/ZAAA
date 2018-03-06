import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { CoUser } from '../../models/coUser';
import { ApiService } from '../../services/api.service';
import { UserRoles } from '../../models/userRoles';
import { routerAnimation } from '../../animations';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CanComponentDeactivate } from '../../guards/canComponentDeactivate';

@Component({
  selector: 'app-new-co-user',
  animations: [routerAnimation],
  templateUrl: './new-co-user.component.html',
  styleUrls: ['./new-co-user.component.css']
})
export class NewCoUserComponent implements OnInit, CanComponentDeactivate {

  @HostBinding('@routeAnimation') routeAnimation = true;

  @ViewChild('newCoUserForm') newCoUserForm: NgForm;

  name: string;
  designation: string;
  email: string;
  phone: string;
  password: string;
  roles = new UserRoles();

  error: string;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  canDeactivate() {
    return !this.newCoUserForm.dirty;
  }

  private navigateBack() {
    this.router.navigateByUrl('/coUsers');
  }

  submit() {
    this.error = '';

    this.api.createCoUser(this.name, this.designation, this.email, this.phone, this.password).subscribe(
      data => {
        if (data.success)
        {
          let coUser = new CoUser(this.name, this.designation, this.email, this.phone);

          coUser.id = data.msg;

          this.api.setRoles(coUser.id, this.roles).subscribe(d => {
            if (d.success) {
              coUser.roles = this.roles;

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
