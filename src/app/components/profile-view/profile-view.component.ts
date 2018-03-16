import { Component, OnInit, HostBinding } from '@angular/core';
import { UserProfile } from '../../models/userProfile';
import { routerAnimation } from '../../animations';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile-view',
  animations: [routerAnimation],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile = new UserProfile();
  isAdmin: boolean;
  error: string;
  success: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUserProfile().subscribe(data => this.profile = data);

    this.api.getUser().subscribe(data => {
      if (data.success) {
        this.isAdmin = data.user.isAdmin;
      }
    });
  }

  uploadProfilePicture(files: FileList) {
    this.error = '';
    this.success = '';

    this.api.uploadProfilePicture(files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.success = 'Profile Photo uploaded successfully';

          this.profile.photo = environment.uploadsBaseUrl + data.photo;
        }
        else {
          console.log(data);

          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = "Connection failed";
      }
    );
  }

  uploadSign(files: FileList) {
    this.error = '';
    this.success = '';

    this.api.uploadSign(files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.success = 'Signature uploaded successfully';

          this.profile.sign = environment.uploadsBaseUrl + data.photo;
        }
        else {
          console.log(data);

          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = "Connection failed";
      }
    );
  }
}
