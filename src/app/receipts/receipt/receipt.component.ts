import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentReceipt } from '../payment-receipt';
import { Invoice, InvoiceDir, InvoiceApiService } from 'app/invoice';
import { MediaHouse, Client, Executive } from 'app/directory';
import { ReceiptsApiService } from '../receipts-api.service';
import { NotificationService, OptionsService, DialogService } from 'app/services';
import { SelectInvoiceComponent } from '../select-invoice/select-invoice.component';

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

  pastReceipts: PaymentReceipt[] = [];

  @Output() invoiceSelected = new EventEmitter();

  @Input() set invoiceDir(invoiceDir: InvoiceDir) {
    if (invoiceDir) {
      this.init(invoiceDir);
    }
  }

  init(invoiceDir: InvoiceDir) {
    this.invoiceSelected.emit();

    this.invoice = invoiceDir.invoice;
    this.mediaHouse = invoiceDir.mediaHouse;
    this.client = invoiceDir.client;
    this.executive = invoiceDir.executive;
    this.receipt.invoiceID = this.invoice.id;

    this.receipt.paymentType = this.paymentTypes[0];
    this.receipt.paymentAmount = this.invoice.pendingAmount;

    this.invoiceApi.getPayedReceipts(this.invoice).subscribe(data => this.pastReceipts = data);
  }

  ngOnInit() { }

  constructor(private router: Router,
    private api: ReceiptsApiService,
    private invoiceApi: InvoiceApiService,
    private notifications: NotificationService,
    private options: OptionsService,
    private dialog: DialogService) { }

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

  selectInvoice() {
    this.dialog.show(SelectInvoiceComponent).subscribe((data: Invoice) => {
      if (data) {
        this.invoiceApi.getInvoiceDir(data.id).subscribe(dir => {
          this.init(dir);
        });
      }
    });
  }

  round2(num: number) {
    return Math.round(num * 100) / 100
  }
}