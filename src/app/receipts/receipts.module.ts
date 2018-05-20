import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { InvoiceModule } from '../invoice/invoice.module';
import { ReceiptsRoutingModule } from './receipts-routing.module';

import { ReceiptsApiService } from './receipts-api.service';

import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';
import { ReceiptResolver } from './receipt-resolver.service';
import { ReceiptListResolver } from './receipt-list-resolver.service';
import { AdvanceReceiptComponent } from './advance-receipt/advance-receipt.component';

@NgModule({
  imports: [
    BaseModule,
    InvoiceModule,
    ReceiptsRoutingModule
  ],
  declarations: [
    ReceiptComponent,
    ReceiptListComponent,
    ReceiptDetailsComponent,
    AdvanceReceiptComponent
  ],
  providers: [
    ReceiptsApiService,
    ReceiptResolver,
    ReceiptListResolver
  ]
})
export class ReceiptsModule { }
