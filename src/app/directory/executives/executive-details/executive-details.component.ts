import { Component, OnInit } from '@angular/core';
import { Executive } from '../executive';
import { ExecutiveApiService } from '../executive-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-executive-details',
  templateUrl: './executive-details.component.html',
  styleUrls: ['./executive-details.component.css']
})
export class ExecutiveDetailsComponent implements OnInit {

  executive = new Executive();

  constructor(private api: ExecutiveApiService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { executive: Executive }) => {
      this.executive = data.executive;
    });
  }

  uploadProfilePicture(files: FileList) {
    this.api.uploadProfilePicture(this.executive.id, files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.notifications.show('Profile Photo uploaded successfully');

          this.executive.photo = environment.uploadsBaseUrl + data.photo;
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      },
      err => {
        console.log(err);

        this.notifications.show("Connection failed");
      }
    );
  }

}
