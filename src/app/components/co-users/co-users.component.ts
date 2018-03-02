import { Component, OnInit, HostBinding } from '@angular/core';
import { CoUser } from '../../models/coUser';
import { ApiService } from '../../services/api.service';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-co-users',
  animations: [routerAnimation],
  templateUrl: './co-users.component.html',
  styleUrls: ['./co-users.component.css']
})
export class CoUsersComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  adding: boolean;
  admin: boolean;

  coUsers: CoUser[] = [];

  constructor(private api: ApiService) { }

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

  addNew() {
    this.adding = true;
  }

  added(coUser: CoUser) {
    this.coUsers.push(coUser);

    this.adding = false;
  }
}
