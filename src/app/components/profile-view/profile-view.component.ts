import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models/user-profile';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../services/notification.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  profile = new UserProfile();

  constructor(private api: ApiService,
    private dialog: DialogService,
    private notifications: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: UserProfile }) => {
      this.profile = data.user;
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
    this.dialog.confirmDeletion("Are you sure want to delete your Profile Picture?").subscribe(
      confirm => {
        if (!confirm) {
          return;
        }

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
    );
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
    this.dialog.confirmDeletion("Are you sure want to delete your Signature?").subscribe(
      confirm => {
        if (!confirm) {
          return;
        }

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
    );
  }
}
