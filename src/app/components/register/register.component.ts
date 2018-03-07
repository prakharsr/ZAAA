import { Component, OnInit, HostBinding } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { routerAnimation } from '../../animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  animations: [routerAnimation],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  name: string;
  email: string;
  acceptTnC: boolean;
  error: string;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() { }

  GoToLogin() : void {
    this.router.navigateByUrl('/login');
  }

  submit()
  {
    this.error = '';

    this.api.signup(this.name, this.email).subscribe(
      data => {
        if (data.success) {
          this.GoToLogin();
        }
        else {
          console.log(data);

          this.error = data.msg;
        }
      },
      err => {
        this.error = "Connection failed";
        console.log(err);
      }
    );
  }
}
