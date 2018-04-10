import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  admin: boolean;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUser().subscribe(data => {
      if (data.success) {
        this.admin = data.user.isAdmin;
      }
    })
  }

}
