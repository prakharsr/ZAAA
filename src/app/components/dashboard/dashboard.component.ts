import { Component, OnInit, HostBinding } from '@angular/core';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-dashboard',
  animations: [routerAnimation],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
