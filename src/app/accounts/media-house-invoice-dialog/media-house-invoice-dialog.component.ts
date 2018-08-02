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

  constructor(@Inject(MAT_DIALOG_DATA) public data: { ro: ReleaseOrder, insertions }) {
    this.details.releaseOrderId = data.ro.id;
    this.details.insertions = data.insertions;
  }

  ngOnInit() {
  }

  get totalAmount() {
    return this.details.insertions.reduce((a, b) => a + b.netAmount, 0);
  }

  get totalTax() {
    return this.details.insertions.reduce((a, b) => a + b.taxAmount, 0);
  }
}
