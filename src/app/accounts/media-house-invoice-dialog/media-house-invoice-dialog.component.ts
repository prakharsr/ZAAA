import { Component, OnInit } from '@angular/core';
import { MediaHouseInvoice } from '@aaman/accounts/media-house-invoice';

@Component({
  selector: 'app-media-house-invoice-dialog',
  templateUrl: './media-house-invoice-dialog.component.html',
  styleUrls: ['./media-house-invoice-dialog.component.css']
})
export class MediaHouseInvoiceDialogComponent implements OnInit {

  details = new MediaHouseInvoice();

  constructor() { }

  ngOnInit() {
  }

}
