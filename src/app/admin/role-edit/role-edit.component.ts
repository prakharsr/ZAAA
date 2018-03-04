import { Component, OnInit, Input, Output, HostBinding } from '@angular/core';
import { UserRoles } from '../../models/userRoles';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routerAnimation } from '../../animations';

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
  error: string;

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

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
    this.error = '';

    this.api.setRoles(this.id, this.roles).subscribe(data => {
      if (data.success) {       
        this.navigateBack();
      }
      else {
        console.log(data);

        this.error = data.msg;
      }
    },
    err => {
      console.log(err);

      this.error = 'Connection failed';
    });
  }

  onCancel() {
    this.navigateBack();
  }
}
