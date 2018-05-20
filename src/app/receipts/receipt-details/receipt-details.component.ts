import { Component, OnInit } from '@angular/core';
import { PaymentReceipt } from '../payment-receipt';
import { ReceiptsApiService } from '../receipts-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.css']
})
export class ReceiptDetailsComponent implements OnInit {

  receipt = new PaymentReceipt();

  constructor(private api: ReceiptsApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { receipt: PaymentReceipt }) => {
      this.receipt = data.receipt;
    });
  }

}
