import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { IfscService } from '../../services/ifsc.service';
import { routerAnimation } from '../../animations';
import { Firm } from '../../models/firm';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';
import { CanComponentDeactivate } from '../../guards/canComponentDeactivate';

@Component({
  selector: 'app-firm-profile-edit',
  animations: [routerAnimation],
  templateUrl: './firm-profile-edit.component.html',
  styleUrls: ['./firm-profile-edit.component.css']
})
export class FirmProfileEditComponent implements OnInit, CanComponentDeactivate {

  @HostBinding('@routeAnimation') routeAnimation = true;

  @ViewChild('profileForm') profileForm: NgForm;

  profile = new Firm();
  error: string;
  success: string;

  constructor(private ifscService: IfscService, private api: ApiService) { }

  ngOnInit() {
    this.api.getFirmProfile().subscribe(data => this.profile = data);
  }

  canDeactivate() {
    return !this.profileForm.dirty;
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

  submit() {
    this.error = '';
    this.success = '';

    this.api.setFirmProfile(this.profile).subscribe(
      data => {
        if (data.success) {
          this.success = 'Firm Profile updated successfully';
        }
        else {
          console.log(data);

          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
      }
    );
  }
}
