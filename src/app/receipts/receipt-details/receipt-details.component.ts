import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentReceipt } from '../payment-receipt';
import { ReceiptsApiService } from '../receipts-api.service';
import * as receiptGen from '../receipt-gen';
import { NotificationService, DialogService } from 'app/services';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.css']
})
export class ReceiptDetailsComponent implements OnInit {

  receipt = new PaymentReceipt();

  constructor(private api: ReceiptsApiService,
    private route: ActivatedRoute,
    private notifications: NotificationService,
    private dialog: DialogService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { receipt: PaymentReceipt }) => {
      this.receipt = data.receipt;
    });
  }

  gen() {
    receiptGen.generate(this.receipt, this.api, this.notifications);
  }

  sendMsg() {
    receiptGen.sendMsg(this.receipt, this.api, this.notifications, this.dialog);
  }

  cancel() {
    receiptGen.cancel(this.receipt, this.api, this.notifications, this.dialog);
  }
}
