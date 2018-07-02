import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentReceipt } from '../payment-receipt';
import { Invoice, InvoiceDir } from 'app/invoice';
import { MediaHouse, Client, Executive } from 'app/directory';
import { ReceiptsApiService } from '../receipts-api.service';
import { NotificationService, OptionsService } from 'app/services';

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

  @Input() set invoiceDir(invoiceDir: InvoiceDir) {
    if (invoiceDir) {
      this.init(invoiceDir);
    }
  }

  init(invoiceDir: InvoiceDir) {
    this.invoice = invoiceDir.invoice;
    this.mediaHouse = invoiceDir.mediaHouse;
    this.client = invoiceDir.client;
    this.executive = invoiceDir.executive;
    this.receipt.invoiceID = this.invoice.id;

    this.receipt.paymentType = this.paymentTypes[0];
    this.receipt.paymentAmount = this.invoice.pendingAmount;
  }

  ngOnInit() { }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ReceiptsApiService,
    private notifications: NotificationService,
    private options: OptionsService) { }

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

  selectInvoice() { }
}