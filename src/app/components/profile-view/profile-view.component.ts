import { Component, OnInit, HostBinding } from '@angular/core';
import { UserProfile } from '../../models/user-profile';
import { routerAnimation } from '../../animations';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../services/notification.service';

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

  constructor(private api: ApiService, private notifications: NotificationService) { }

  ngOnInit() {
    this.api.getUserProfile().subscribe(data => this.profile = data);

    this.api.getUser().subscribe(data => {
      if (data.success) {
        this.isAdmin = data.user.isAdmin;
      }
    });
  }

  uploadProfilePicture(files: FileList) {
    this.api.uploadProfilePicture(files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Profile Photo uploaded successfully');

          this.profile.photo = environment.uploadsBaseUrl + data.photo;
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      },
      err => {
        console.log(err);

        this.notifications.show("Connection failed");
      }
    );
  }

  removeProfilePicture() {
    this.api.deleteProfilePicture().subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Profile Picture removed successfully');

          this.profile.photo = environment.uploadsBaseUrl + data.photo;
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      },
      err => {
        console.log(err);

        this.notifications.show("Connection failed");
      }
    )
  }

  uploadSign(files: FileList) {
    this.api.uploadSign(files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Signature uploaded successfully');

          this.profile.sign = environment.uploadsBaseUrl + data.photo;
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      },
      err => {
        console.log(err);

        this.notifications.show("Connection failed");
      }
    );
  }

  removeSign() {
    this.api.deleteSign().subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Signature removed successfully');

          this.profile.sign = environment.uploadsBaseUrl + data.photo;
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      },
      err => {
        console.log(err);

        this.notifications.show("Connection failed");
      }
    )
  }
}
