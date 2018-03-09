import { Component, OnInit, HostBinding } from '@angular/core';
import { Firm } from '../../models/firm';
import { routerAnimation } from '../../animations';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-firm-profile-view',
  animations: [routerAnimation],
  templateUrl: './firm-profile-view.component.html',
  styleUrls: ['./firm-profile-view.component.css']
})
export class FirmProfileViewComponent implements OnInit {

  admin: boolean;
  error: string;
  success: string;

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile = new Firm();

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getFirmProfile().subscribe(data => this.profile = data);

    this.api.getUser().subscribe(data => {
      if (data.success) {
        this.admin = data.user.isAdmin;
      }
    });
  }

  uploadLogo(files: FileList) {
    this.error = '';
    this.success = '';

    this.api.uploadFirmLogo(files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.success = 'Logo uploaded successfully';

          this.profile.logo = environment.uploadsBaseUrl + data.photo;
        }
        else {
          console.log(data);

          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = "Connection failed";
      }
    );
  }
}
