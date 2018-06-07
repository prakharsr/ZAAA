import { Component, OnInit } from '@angular/core';
import { Address } from 'app/models';

// Prevent circular dependency
import { StateApiService } from 'app/services/state-api.service';
import { ReleaseOrder } from '..';

export class InsertionDetails {

}

@Component({
  selector: 'app-insertion-details',
  templateUrl: './insertion-details.component.html',
  styleUrls: ['./insertion-details.component.css']
})
export class InsertionDetailsComponent implements OnInit {

  details = new InsertionDetails();
  
  constructor(public stateApi: StateApiService) { }

  ngOnInit() {
  }

}
