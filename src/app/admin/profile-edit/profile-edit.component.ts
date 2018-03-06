import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { UserProfile } from '../../models/userProfile';
import { routerAnimation } from '../../animations';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { CanComponentDeactivate } from '../../guards/canComponentDeactivate';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  animations: [routerAnimation],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, CanComponentDeactivate {

  @HostBinding('@routeAnimation') routeAnimation = true;

  @ViewChild('profileForm') profileForm: NgForm;

  profile = new UserProfile();
  error: string;
  success: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUserProfile().subscribe(data => this.profile = data);
  }

  canDeactivate() {
    return !this.profileForm.dirty;
  }

  uploadProfilePicture(files: FileList) {
    this.error = '';
    this.success = '';

    this.api.uploadProfilePicture(files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.success = 'Profile Photo uploaded successfully';

          this.profile.photo = environment.uploadsBaseUrl + data.photo;
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

  uploadSign(files: FileList) {
    this.error = '';
    this.success = '';

    this.api.uploadSign(files.item(0)).subscribe(
      data => {
        if (data.success) {
          this.success = 'Signature uploaded successfully';

          this.profile.sign = environment.uploadsBaseUrl + data.photo;
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

  submit() {
    this.error = '';
    this.success = '';

    this.api.setUserProfile(this.profile).subscribe(
      data => {
        if (data.success) {
          this.success = 'Profile Updated Successfully';
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