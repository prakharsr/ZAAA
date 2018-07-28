import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../super-admin-api.service';
import { MediaHouse } from '../../directory';
import { NotificationService } from '../../services';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-global-media-house',
  templateUrl: './global-media-house.component.html',
  styleUrls: ['./global-media-house.component.css']
})
export class GlobalMediaHouseComponent implements OnInit {

  constructor(private api: SuperAdminApiService,
    private notifications: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  submit(mediaHouse: MediaHouse) {
    this.api.createGlobalMediaHouse(mediaHouse).subscribe(
      data => {
        if (data.success) {
          this.router.navigateByUrl('/superadmin/media_houses');
        }
        else {
          console.log(data);
          
          this.notifications.show(data.msg);
        }
      }
    );
  }

}
