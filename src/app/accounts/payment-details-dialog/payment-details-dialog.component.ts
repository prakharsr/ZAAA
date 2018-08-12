import { Component, OnInit } from '@angular/core';

export class PaymentDetails {
  paymentType = "Cash";
  paymentDate = "";
  paymentNo = "";
  paymentAmount = 0;
  paymentBankName = "";
}

@Component({
  selector: 'app-payment-details-dialog',
  templateUrl: './payment-details-dialog.component.html',
  styleUrls: ['./payment-details-dialog.component.css']
})
export class PaymentDetailsDialogComponent implements OnInit {

  details = new PaymentDetails();

  paymentTypes = ['Cash', 'Credit', 'Cheque', 'NEFT'];

  constructor() { }

  ngOnInit() {
  }

}
