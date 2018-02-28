import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models/userProfile';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  profile : UserProfile = new UserProfile();

  constructor() { }

  ngOnInit() {
    this.profile.name = "Yash";
  }

}
