import { Component, OnInit, HostBinding } from '@angular/core';
import { UserProfile } from '../../models/userProfile';
import { IfscService } from '../../services/ifsc.service';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-profile-edit',
  animations: [routerAnimation],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile: UserProfile = new UserProfile();

  constructor(private ifscService: IfscService) { }

  ngOnInit() {
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

  submit() {}
}
