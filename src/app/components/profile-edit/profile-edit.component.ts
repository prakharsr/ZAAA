import { Component, OnInit, HostBinding } from '@angular/core';
import { UserProfile } from '../../models/userProfile';
import { routerAnimation } from '../../animations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile-edit',
  animations: [routerAnimation],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile: UserProfile = new UserProfile();

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  uploadProfilePicture(files: FileList) {
    this.api.uploadProfilePicture(files.item(0)).subscribe(
      data => {
        if (data.success) {
          alert('uploaded');
        }
        else console.log(data);
      },
      err => console.log(err)
    );
  }

  submit() {}
}
