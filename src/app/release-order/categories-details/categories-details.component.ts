import { Component, OnInit } from '@angular/core';
import { Address } from 'app/models';

// Prevent circular dependency
import { StateApiService } from 'app/services/state-api.service';
import { ReleaseOrder } from '..';

export class CategoriesDetails {

}

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit {

  details = new CategoriesDetails();
  
  constructor(public stateApi: StateApiService) { }

  ngOnInit() {
  }

}
