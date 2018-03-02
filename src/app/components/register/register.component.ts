import { Component, OnInit, HostBinding } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { routerAnimation } from '../../animations';
import { WindowService } from '../../services/window.service';

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
  cpassword: string;
  error: string;

  constructor(private api: ApiService, private winRef: WindowService) { }

  ngOnInit() { }

  GoToDashboard() : void {
    this.winRef.window.location.pathname = '/dashboard';
  }

  submit()
  {
    this.error = '';

    this.api.signup(this.name, this.email, this.password).subscribe(
      data => {
        if (data.success) {
          this.api.sendVerificationMail();

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
