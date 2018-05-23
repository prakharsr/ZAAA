import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firm, UserProfile } from 'app/models';
import { ApiService, DialogService, NotificationService } from 'app/services';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-firm-profile-view',
  templateUrl: './firm-profile-view.component.html',
  styleUrls: ['./firm-profile-view.component.css']
})
export class FirmProfileViewComponent implements OnInit {

  admin: boolean;

  profile = new Firm();

  constructor(private api: ApiService,
    private dialog: DialogService,
    private notifications: NotificationService,
    private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.data.subscribe((data: { firm: Firm, user: UserProfile }) => {
      this.profile = data.firm;
      this.admin = data.user.isAdmin;
    });
  }

  uploadLogo(files: FileList) {

    this.api.uploadFirmLogo(files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Logo uploaded successfully');

          this.profile.logo = environment.uploadsBaseUrl + data.photo;
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }

  removeLogo() {
    this.dialog.confirmDeletion("Are you sure want to delete the firm logo?").subscribe(
      confirm => {
        if (!confirm) {
          return;
        }

        this.api.deleteFirmLogo().subscribe(
          data => {
            if (data.success) {
              this.notifications.show('Logo removed successfully');
    
              this.profile.logo = environment.uploadsBaseUrl + data.photo;
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
