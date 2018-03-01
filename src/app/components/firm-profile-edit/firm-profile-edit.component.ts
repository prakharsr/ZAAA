import { Component, OnInit, HostBinding } from '@angular/core';
import { IfscService } from '../../services/ifsc.service';
import { routerAnimation } from '../../animations';
import { Firm } from '../../models/firm';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-firm-profile-edit',
  animations: [routerAnimation],
  templateUrl: './firm-profile-edit.component.html',
  styleUrls: ['./firm-profile-edit.component.css']
})
export class FirmProfileEditComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile = new Firm();
  error: string;
  success: boolean;

  constructor(private ifscService: IfscService, private api: ApiService) { }

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

  submit() {
    this.error = '';
    this.success = false;

    this.api.setFirmProfile(this.profile).subscribe(
      data => {
        if (data.success) {
          this.success = true;
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
