import { Component, OnInit } from '@angular/core';
import { Firm } from '../../models/firm';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../services/notification.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

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

    this.route.data.subscribe((data: { firm: Firm }) => {
      this.profile = data.firm;
    });

    this.api.getUser().subscribe(data => {
      if (data.success) {
        this.admin = data.user.isAdmin;
      }
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
      },
      err => {
        console.log(err);

        this.notifications.show("Connection failed");
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
