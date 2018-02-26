import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models/userProfile';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profile: UserProfile = new UserProfile("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");

  constructor() { }

  ngOnInit() {
  }

  submit() {}
}
