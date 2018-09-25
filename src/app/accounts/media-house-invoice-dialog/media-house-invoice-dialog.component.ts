import { Component, OnInit, Inject } from '@angular/core';
import { MediaHouseInvoice } from '../media-house-invoice';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ReleaseOrder } from 'app/release-order';

@Component({
  selector: 'app-media-house-invoice-dialog',
  templateUrl: './media-house-invoice-dialog.component.html',
  styleUrls: ['./media-house-invoice-dialog.component.css']
})
export class MediaHouseInvoiceDialogComponent implements OnInit {

  details = new MediaHouseInvoice();

  totalAmount = 0;
  totalTax = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { ro: ReleaseOrder, insertions }) {
    this.details.releaseOrderId = data.ro.id;
    this.details.insertions = data.insertions;

    this.totalAmount = this.details.insertions.reduce((a, b) => a + b.netAmount, 0);
    this.totalTax = this.details.insertions.reduce((a, b) => a + b.taxAmount, 0);

    this.details.MHIGrossAmount = this.totalAmount;
    this.details.MHITaxAmount = this.totalTax;
  }

  ngOnInit() {
  }
}
