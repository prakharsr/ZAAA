import { Component, OnInit, HostBinding } from '@angular/core';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-home',
  animations: [routerAnimation],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
