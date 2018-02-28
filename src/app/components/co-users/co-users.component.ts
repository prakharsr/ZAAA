import { Component, OnInit } from '@angular/core';
import { CoUser } from '../../models/coUser';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-co-users',
  templateUrl: './co-users.component.html',
  styleUrls: ['./co-users.component.css']
})
export class CoUsersComponent implements OnInit {

  adding: boolean;

  coUsers: CoUser[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.coUsers.subscribe(data => {
      data.co_users.forEach(element => {
        let coUser = new CoUser(element.name, element.email, element.phone);

        coUser.id = element._id;

        this.coUsers.push(coUser);
      });
    });
  }

  addNew() {
    this.adding = true;
  }

  added(coUser: CoUser) {
    this.coUsers.push(coUser);

    this.adding = false;
  }
}
