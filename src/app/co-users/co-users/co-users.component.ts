import { Component, OnInit, HostBinding } from '@angular/core';
import { CoUser } from '../coUser';
import { routerAnimation } from '../../animations';
import { DialogService } from '../../services/dialog.service';
import { CoUserApiService } from '../co-user-api.service';

@Component({
  selector: 'app-co-users',
  animations: [routerAnimation],
  templateUrl: './co-users.component.html',
  styleUrls: ['./co-users.component.css']
})
export class CoUsersComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  admin: boolean;

  coUsers: CoUser[] = [];

  constructor(private api: CoUserApiService, private dialog: DialogService) { }

  ngOnInit() {
    this.api.coUsers.subscribe(data => {
      data.co_users.forEach(element => {
        let coUser = new CoUser(element.name, element.designation, element.email, element.phone);

        coUser.id = element._id;

        this.coUsers.push(coUser);
      });
    });

    this.api.getUser().subscribe(data => {
      if (data.success) {
        this.admin = data.user.isAdmin;
      }
    })
  }

  delete(coUser: CoUser) {
    this.dialog.confirm("Are you sure want to delete this Co-User?").subscribe(
      confirm => {
        if (!confirm) {
          return;
        }

        this.api.deleteCoUser(coUser).subscribe(
          data => {
            if (data.success) {
              this.coUsers = this.coUsers.filter(h => h.id !== coUser.id);
            }
          }
        );
      }
    );
  }
}
