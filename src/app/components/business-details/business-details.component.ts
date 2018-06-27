import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firm, UserProfile } from 'app/models';

import {
  ApiService,
  DialogService,
  NotificationService,
  StateApiService,
  IfscService
} from 'app/services';

import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  user: UserProfile;
  profile = new Firm();

  editAgencyDetails = false;
  editContactDetails = false;
  editRegAddr = false;
  editOfficeAddr = false;
  editBankDetails = false;
  editSocialDetails = false;

  constructor(private ifscService: IfscService,
    private api: ApiService,
    private dialog: DialogService,
    private notifications: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public stateApi: StateApiService) {}

  ngOnInit() {

    this.route.data.subscribe((data: { firm: Firm, user: UserProfile }) => {
      this.profile = data.firm;
      this.user = data.user;
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

  ifscChanged() {
    if (this.profile.bankIfsc.length == 11) {
      this.ifscService.getData(this.profile.bankIfsc).subscribe(
        data => {
          this.profile.bankName = data.BANK;
          this.profile.bankBranchAddress = data.ADDRESS;
        }
      );
    }
    else {
      this.profile.bankName = '';
      this.profile.bankBranchAddress = '';
    }
  }

  copyAddress() {
    this.profile.officeAddress.address = this.profile.registeredAddress.address;
    this.profile.officeAddress.city = this.profile.registeredAddress.city;
    this.profile.officeAddress.state = this.profile.registeredAddress.state;
    this.profile.officeAddress.pincode = this.profile.registeredAddress.pincode;
  }

  private goBack() {
    this.router.navigateByUrl('/firm');
  }

  submit() {
    this.api.setFirmProfile(this.profile).subscribe(
      data => {
        if (data.success) {
          this.notifications.show("Saved");

          this.editAgencyDetails = false;
          this.editContactDetails = false;
          this.editRegAddr = false;
          this.editOfficeAddr = false;
          this.editBankDetails = false;
          this.editSocialDetails = false;
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }

  cancel() {
    this.goBack();
  }
}
