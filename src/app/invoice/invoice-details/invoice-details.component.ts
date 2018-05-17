import { Component, OnInit } from '@angular/core';
import { Invoice } from '../invoice';
import { ActivatedRoute } from '@angular/router';

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

}
