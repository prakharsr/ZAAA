import { Component, OnInit, HostBinding } from '@angular/core';
import { Firm } from '../../models/firm';
import { routerAnimation } from '../../animations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-firm-profile-view',
  animations: [routerAnimation],
  templateUrl: './firm-profile-view.component.html',
  styleUrls: ['./firm-profile-view.component.css']
})
export class FirmProfileViewComponent implements OnInit {

  admin: boolean;

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile = new Firm();

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getFirmProfile().subscribe(data => this.profile = data);

    this.api.getUser().subscribe(data => {
      if (data.success) {
        this.admin = data.user.isAdmin;
      }
    })
  }
}
