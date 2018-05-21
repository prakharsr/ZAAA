import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentReceipt } from '@aaman/receipts/payment-receipt';
import { Invoice } from '@aaman/invoice/invoice';
import { MediaHouse } from '@aaman/dir/media-houses/media-house';
import { Client } from '@aaman/dir/clients/client';
import { Executive } from '@aaman/dir/executives/executive';
import { ReceiptsApiService } from '@aaman/receipts/receipts-api.service';
import { NotificationService } from '@aaman/main/notification.service';
import { OptionsService } from '@aaman/main/options.service';
import { InvoiceDir } from '@aaman/invoice/invoice-dir-resolver.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  receipt = new PaymentReceipt();
  invoice: Invoice;
  mediaHouse: MediaHouse;
  client: Client;
  executive: Executive;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ReceiptsApiService,
    private notifications: NotificationService,
    private options: OptionsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: InvoiceDir }) => {
      this.invoice = data.resolved.invoice;
      this.mediaHouse = data.resolved.mediaHouse;
      this.client = data.resolved.client;
      this.executive = data.resolved.executive;
      this.receipt.invoiceID = this.invoice.id;

      this.receipt.paymentType = this.paymentTypes[0];
      this.receipt.paymentAmount = this.invoice.pendingAmount;
    });
  }

  submit () {
    this.receipt.paymentAmountWords = this.options.amountToWords(this.receipt.paymentAmount);

    this.api.createReceipt(this.receipt).subscribe(data => {
      if (data.success) {
        this.goBack();
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }

  private goBack() {
    this.router.navigateByUrl('/receipts');
  }

  cancel() {
    this.goBack();
  }

  paymentTypes = ['Cash', 'Credit', 'Cheque', 'NEFT'];
}