import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '../../models/address';
import { StateApiService } from '../../services/state-api.service';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {

  firmName: string;
  billingAddress = new Address();
  gstNo: string;
  
  @Output() done = new EventEmitter();

  constructor(public stateApi: StateApiService) { }

  ngOnInit() {
  }

  submit() {
    this.done.emit({
      firmName: this.firmName,
      billingAddress: this.billingAddress,
      gstNo: this.gstNo
    })
  }

}
