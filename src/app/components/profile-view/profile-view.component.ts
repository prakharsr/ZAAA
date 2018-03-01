import { Component, OnInit, HostBinding } from '@angular/core';
import { UserProfile } from '../../models/userProfile';
import { routerAnimation } from '../../animations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile-view',
  animations: [routerAnimation],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile : UserProfile;
  admin: boolean;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUserProfile().subscribe(data => this.profile = data);

    this.api.getUser().subscribe(data => {
      if (data.success) {
        this.admin = data.user.isAdmin;
      }
    });
  }
}
