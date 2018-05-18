import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { InvoiceModule } from '../invoice/invoice.module';
import { ReceiptsRoutingModule } from './receipts-routing.module';

import { ReceiptsApiService } from './receipts-api.service';

import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';

@NgModule({
  imports: [
    BaseModule,
    InvoiceModule,
    ReceiptsRoutingModule
  ],
  declarations: [
    ReceiptComponent,
    ReceiptListComponent,
    ReceiptDetailsComponent
  ],
  providers: [
    ReceiptsApiService
  ]
})
export class ReceiptsModule { }
