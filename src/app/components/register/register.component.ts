import { Component, OnInit, HostBinding } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-register',
  animations: [routerAnimation],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  state: number = 0;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() { }

  NextState() : void {
    ++this.state;
  }

  GoToDashboard() : void {
    this.router.navigateByUrl('dashboard');
  }
}
