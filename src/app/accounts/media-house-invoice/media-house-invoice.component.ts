import { Component, OnInit } from '@angular/core';
import { DialogService } from '@aaman/main/dialog.service';
import { MediaHouseInvoiceDialogComponent } from '@aaman/accounts/media-house-invoice-dialog/media-house-invoice-dialog.component';

@Component({
  selector: 'app-media-house-invoice',
  templateUrl: './media-house-invoice.component.html',
  styleUrls: ['./media-house-invoice.component.css']
})
export class MediaHouseInvoiceComponent implements OnInit {

  constructor(private dialog: DialogService) { }

  ngOnInit() {
  }

  show() {
    this.dialog.show(MediaHouseInvoiceDialogComponent);
  }
}
