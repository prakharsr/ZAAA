import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'app/models';
import { ApiService, DialogService, NotificationService } from 'app/services';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

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
          }
        )
      }
    );
  }
}
