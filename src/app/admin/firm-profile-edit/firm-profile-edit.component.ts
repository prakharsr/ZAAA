import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfile } from '@aaman/main/user-profile';
import { Firm } from '@aaman/main/firm';
import { IfscService } from '@aaman/main/ifsc.service';
import { ApiService } from '@aaman/main/api.service';
import { StateApiService } from '@aaman/main/state-api.service';
import { NotificationService } from '@aaman/main/notification.service';

@Component({
  selector: 'app-firm-profile-edit',
  templateUrl: './firm-profile-edit.component.html',
  styleUrls: ['./firm-profile-edit.component.css']
})
export class FirmProfileEditComponent implements OnInit {
  profile = new Firm();
  user: UserProfile;

  constructor(private ifscService: IfscService,
    private api: ApiService,
    public stateApi: StateApiService,
    private router: Router,
    private notifications: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { firm: Firm, user: UserProfile }) => {
      this.profile = data.firm;
      this.user = data.user;
    });
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
          this.goBack();
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
