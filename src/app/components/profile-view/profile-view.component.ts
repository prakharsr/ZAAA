import { Component, OnInit, HostBinding } from '@angular/core';
import { UserProfile } from '../../models/userProfile';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-profile-view',
  animations: [routerAnimation],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile : UserProfile = new UserProfile();

  constructor() { }

  ngOnInit() {
    this.profile.name = "Yash";
  }

}
