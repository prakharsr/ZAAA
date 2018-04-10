import { Component, OnInit } from '@angular/core';
import { IfscService } from '../../services/ifsc.service';
import { Firm } from '../../models/firm';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';
import { StateApiService } from '../../services/state-api.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-firm-profile-edit',
  templateUrl: './firm-profile-edit.component.html',
  styleUrls: ['./firm-profile-edit.component.css']
})
export class FirmProfileEditComponent implements OnInit {
  profile = new Firm();

  constructor(private ifscService: IfscService,
    private api: ApiService,
    public stateApi: StateApiService,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.api.getFirmProfile().subscribe(data => this.profile = data);
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
      },
      err => {
        console.log(err);

        this.notifications.show('Connection failed');
      }
    );
  }

  cancel() {
    this.goBack();
  }
}
