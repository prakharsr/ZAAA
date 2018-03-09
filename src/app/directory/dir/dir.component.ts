import { Component, OnInit, HostBinding } from '@angular/core';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-dir',
  animations: [routerAnimation],
  templateUrl: './dir.component.html',
  styleUrls: ['./dir.component.css']
})
export class DirComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
