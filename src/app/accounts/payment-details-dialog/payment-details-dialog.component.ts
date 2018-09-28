import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

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

  totalAmount = 0;

  details = new PaymentDetails();

  paymentTypes = ['Cash', 'Cheque', 'NEFT'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { amount: number }) {
    if (data.amount) {
      this.totalAmount = data.amount;
      this.details.paymentAmount = data.amount;
    }
  }

  ngOnInit() {
  }

}
