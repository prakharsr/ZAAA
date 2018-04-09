import { Component, OnInit, HostBinding } from '@angular/core';
import { routerAnimation } from '../../animations';
import { DialogService } from '../../services/dialog.service';
import { CoUserApiService } from '../co-user-api.service';
import { CoUser } from '../co-user';

@Component({
  selector: 'app-co-users',
  animations: [routerAnimation],
  templateUrl: './co-users.component.html',
  styleUrls: ['./co-users.component.css']
})
export class CoUsersComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  admin: boolean;
  myId: string;

  coUsers: CoUser[] = [];

  constructor(private api: CoUserApiService, private dialog: DialogService) { }

  ngOnInit() {
    this.api.coUsers.subscribe(data => this.coUsers = data);

    this.api.getUser().subscribe(data => {
      if (data.success) {
        this.admin = data.user.isAdmin;
        this.myId = data.user._id;
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
