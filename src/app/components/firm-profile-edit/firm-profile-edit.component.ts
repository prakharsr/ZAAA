import { Component, OnInit, HostBinding } from '@angular/core';
import { IfscService } from '../../services/ifsc.service';
import { routerAnimation } from '../../animations';
import { Firm } from '../../models/firm';

@Component({
  selector: 'app-firm-profile-edit',
  animations: [routerAnimation],
  templateUrl: './firm-profile-edit.component.html',
  styleUrls: ['./firm-profile-edit.component.css']
})
export class FirmProfileEditComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile = new Firm();

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
