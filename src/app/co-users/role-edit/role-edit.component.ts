import { Component, OnInit, Input, Output, HostBinding } from '@angular/core';
import { UserRoles } from '../user-roles';
import { ActivatedRoute, Router } from '@angular/router';
import { routerAnimation } from '../../animations';
import { CoUserApiService } from '../co-user-api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-role-edit',
  animations: [routerAnimation],
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  @Input() @Output() roles = new UserRoles();
  id: string;

  constructor(private api: CoUserApiService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.api.getRoles(this.id).subscribe(data => this.roles = data);
    });
  }

  private navigateBack() {
    this.router.navigateByUrl('/coUsers');
  }

  submit() {
    this.api.setRoles(this.id, this.roles).subscribe(data => {
      if (data.success) {       
        this.navigateBack();
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    },
    err => {
      console.log(err);

      this.notifications.show('Connection failed');
    });
  }

  onCancel() {
    this.navigateBack();
  }
}
