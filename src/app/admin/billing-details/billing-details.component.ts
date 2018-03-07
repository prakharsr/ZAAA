import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {

  firmName: string;
  billingAddress: string;
  gstNo: string;
  
  @Output() done = new EventEmitter();

  error: string;

  constructor() { }

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
