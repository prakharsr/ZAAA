import { Component, OnInit } from '@angular/core';
import { PaymentReceipt } from '../payment-receipt';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptsApiService } from '../receipts-api.service';
import { MediaHouseApiService } from '../../directory/media-houses/media-house-api.service';
import { ClientApiService } from '../../directory/clients/client-api.service';
import { ExecutiveApiService } from '../../directory/executives/executive-api.service';
import { NotificationService } from '../../services/notification.service';
import { OptionsService } from '../../services/options.service';
import { InvoiceDir } from '../../invoice/invoice-dir-resolver.service';
import { Invoice } from '../../invoice/invoice';
import { MediaHouse } from '../../directory/media-houses/media-house';
import { Client } from '../../directory/clients/client';
import { Executive } from '../../directory/executives/executive';

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
    private mediaHouseApi: MediaHouseApiService,
    private clientApi: ClientApiService,
    private executiveApi: ExecutiveApiService,
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

