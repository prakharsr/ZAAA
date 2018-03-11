import { Component, OnInit } from '@angular/core';
import { DirExecutive } from '../dirExecutive';
import { ExecutiveApiService } from '../executive-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-executive-details',
  templateUrl: './executive-details.component.html',
  styleUrls: ['./executive-details.component.css']
})
export class ExecutiveDetailsComponent implements OnInit {

  executive = new DirExecutive();
  error: string;
  success: string;
  id: string;

  constructor(private api: ExecutiveApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.api.getExecutive(this.id).subscribe(data => this.executive = data);
    });
  }

  uploadProfilePicture(files: FileList) {
    this.error = '';
    this.success = '';

    this.api.uploadProfilePicture(this.id, files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.success = 'Profile Photo uploaded successfully';

          this.executive.photo = environment.uploadsBaseUrl + data.photo;
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
