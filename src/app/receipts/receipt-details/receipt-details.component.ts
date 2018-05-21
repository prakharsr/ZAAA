import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentReceipt } from '@aaman/receipts/payment-receipt';
import { ReceiptsApiService } from '@aaman/receipts/receipts-api.service';

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
