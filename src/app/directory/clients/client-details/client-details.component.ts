import { Component, OnInit } from '@angular/core';
import { DirClient } from '../dirClient';
import { ClientApiService } from '../client-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client = new DirClient();
  id: string;
  success: string;
  error: string;

  constructor(private api: ClientApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.api.getClient(this.id).subscribe(data => this.client = data);
    });
  }

  uploadProfilePicture(files: FileList) {
    this.error = '';
    this.success = '';

    this.api.uploadProfilePicture(this.id, files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.success = 'Profile Photo uploaded successfully';

          this.client.contactPerson.photo = environment.uploadsBaseUrl + data.photo;
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
