import { Component, OnInit, HostBinding } from '@angular/core';
import { Firm } from '../../models/firm';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-firm-profile-view',
  animations: [routerAnimation],
  templateUrl: './firm-profile-view.component.html',
  styleUrls: ['./firm-profile-view.component.css']
})
export class FirmProfileViewComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  profile = new Firm();

  constructor() { }

  ngOnInit() {
    this.profile.name = "Yash";
  }
}
