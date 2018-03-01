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

  state: number = 0;

  constructor(private api: ApiService, private winRef: WindowService) { }

  ngOnInit() { }

  NextState() : void {
    ++this.state;
  }

  GoToDashboard() : void {
    this.winRef.window.location.pathname = '/dashboard';
  }
}
