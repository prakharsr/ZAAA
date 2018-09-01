import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Invoice } from '../invoice';
import { PaymentReceipt } from 'app/receipts';
import { InvoiceApiService } from '../invoice-api.service';
import { NotificationService, DialogService } from '../../services';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  invoice = new Invoice();

  receipts: PaymentReceipt[] = [];

  constructor(private route: ActivatedRoute,
    private api: InvoiceApiService, private notifications: NotificationService, private dialog: DialogService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { invoice: Invoice }) => {
      this.invoice = data.invoice;
    });

    this.api.getPayedReceipts(this.invoice).subscribe(data => this.receipts = data);
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }

  gen(invoice: Invoice) {
    this.api.generate(invoice).subscribe(data => {
      if (data.msg) {
        this.notifications.show(data.msg);
      }
      else {
        console.log(data);
        
        let blob = new Blob([data], { type: 'application/pdf' });
        let url = URL.createObjectURL(blob);

        let a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = 'invoice.pdf';
        a.href = url;
        a.click();
      }
    });
  }

  sendMsg(invoice: Invoice) {
    this.dialog.getMailingDetails().subscribe(mailingDetails => {
      if (mailingDetails) {
        this.api.sendMail(invoice, mailingDetails).subscribe(data => {
          if (data.success) {
            this.notifications.show("Sent Successfully");
          }
          else {
            console.log(data);

            this.notifications.show(data.msg);
          }
        });
      }
    });
  }

  createPaymentReceipt(invoice: Invoice) {
    if (invoice.pendingAmount <= 0) {
      this.notifications.show('All Payments have been completed for this Invoice');

      return;
    }

    this.router.navigate(['/receipts/new', invoice.id]);
  }

  linkAdvanceReceipt(invoice: Invoice) {
    if (invoice.pendingAmount <= 0) {
      this.notifications.show('All Payments have been completed for this Invoice');

      return;
    }

    this.router.navigate(['/receipts/advance/link', invoice.id]);
  }

  get taxDisplay() {
    let tax = this.invoice.taxAmount.primary + "%";

    if (this.invoice.taxAmount.secondary != 0) {
      tax += " + " + this.invoice.taxAmount.secondary + "%"
    }

    if (this.invoice.taxType) {
      tax += " (" + this.invoice.taxType + ") ";
    }

    return tax + (this.invoice.taxIncluded ? " Included" : " Excluded");
  }
}
