import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'app/models';
import { ApiService } from '@aaman/main/api.service';
import { NotificationService } from '@aaman/main/notification.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profile = new UserProfile();

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: UserProfile }) => {
      this.profile = data.user;
    });
  }

  private goBack() {
    this.router.navigateByUrl('/profile');
  }

  submit() {
    this.api.setUserProfile(this.profile).subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }

  cancel() {
    this.goBack();
  }
}
