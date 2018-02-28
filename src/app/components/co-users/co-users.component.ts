import { Component, OnInit } from '@angular/core';
import { CoUser } from '../../models/coUser';

@Component({
  selector: 'app-co-users',
  templateUrl: './co-users.component.html',
  styleUrls: ['./co-users.component.css']
})
export class CoUsersComponent implements OnInit {

  adding: boolean;

  coUsers: CoUser[] = [];

  constructor() { }

  ngOnInit() {
  }

  addNew() {
    this.adding = true;
  }

  added(coUser: CoUser) {
    this.coUsers.push(coUser);

    this.adding = false;
  }
}
