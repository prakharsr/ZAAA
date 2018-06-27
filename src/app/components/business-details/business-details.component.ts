import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firm, UserProfile } from 'app/models';
import { ApiService, DialogService, NotificationService, StateApiService } from 'app/services';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  admin: boolean;

  profile = new Firm();

  editAgencyDetails = false;
  editContactDetails = false;
  editRegAddr = false;
  editOfficeAddr = false;

  constructor(private api: ApiService,
    private dialog: DialogService,
    private notifications: NotificationService,
    private route: ActivatedRoute,
    public stateApi: StateApiService) {}

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
