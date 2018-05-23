import { Component, OnInit } from '@angular/core';
import { DialogService } from '@aaman/main/dialog.service';
import { MediaHouseInvoiceDialogComponent } from '@aaman/accounts/media-house-invoice-dialog/media-house-invoice-dialog.component';
import { AccountsApiService } from '@aaman/accounts/accounts-api.service';

@Component({
  selector: 'app-media-house-invoice',
  templateUrl: './media-house-invoice.component.html',
  styleUrls: ['./media-house-invoice.component.css']
})
export class MediaHouseInvoiceComponent implements OnInit {

  res;

  constructor(private dialog: DialogService,
    private api: AccountsApiService) { }

  ngOnInit() {
    this.res = this.api.searchMediaHouseInvoice(1);
  }

  show() {
    this.dialog.show(MediaHouseInvoiceDialogComponent);
  }
}
