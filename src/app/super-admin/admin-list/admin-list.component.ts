import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../super-admin-api.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  list = [];

  constructor(private api: SuperAdminApiService) { }

  ngOnInit() {
    this.api.admins.subscribe(data => this.list = data);
  }

}
