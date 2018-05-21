import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Invoice } from '@aaman/invoice/invoice';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  invoice = new Invoice();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { invoice: Invoice }) => {
      this.invoice = data.invoice;
    });
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
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
