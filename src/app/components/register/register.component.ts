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
  password: string;
  error: string;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() { }

  GoToDashboard() : void {
    this.router.navigateByUrl('/dashboard');
  }

  submit()
  {
    this.error = '';

    this.api.signup(this.name, this.email, this.password).subscribe(
      data => {
        if (data.success) {
          this.GoToDashboard();
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
