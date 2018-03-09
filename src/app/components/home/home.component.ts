import { Component, OnInit, HostBinding } from '@angular/core';
import { routerAnimation } from '../../animations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  animations: [routerAnimation],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

}
