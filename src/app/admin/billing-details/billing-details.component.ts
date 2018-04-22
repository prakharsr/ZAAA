import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '../../models/address';
import { StateApiService } from '../../services/state-api.service';

export class BillingDetails {
  firmName: string;
  billingAddress = new Address();
  GSTIN = {
    GSTType: 'URD',
    GSTNo: ""
  }
}

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {

  details = new BillingDetails();
  
  @Output() done = new EventEmitter();

  constructor(public stateApi: StateApiService) { }

  ngOnInit() {
  }

  submit() {
    this.done.emit(this.details);
  }

}
