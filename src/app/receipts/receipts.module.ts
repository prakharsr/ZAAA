import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { InvoiceModule } from 'app/invoice/invoice.module';
import { ReceiptsRoutingModule } from './receipts-routing.module';

import { ReceiptsApiService } from '@aaman/receipts/receipts-api.service';
import { ReceiptResolver } from '@aaman/receipts/receipt-resolver.service';
import { ReceiptListResolver } from '@aaman/receipts/receipt-list-resolver.service';

import { ReceiptComponent } from '@aaman/receipts/receipt/receipt.component';
import { ReceiptListComponent } from '@aaman/receipts/receipt-list/receipt-list.component';
import { ReceiptDetailsComponent } from '@aaman/receipts/receipt-details/receipt-details.component';
import { AdvanceReceiptComponent } from '@aaman/receipts/advance-receipt/advance-receipt.component';
import { LinkAdvanceComponent } from '@aaman/receipts/link-advance/link-advance.component';

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
    AdvanceReceiptComponent,
    LinkAdvanceComponent
  ],
  providers: [
    ReceiptsApiService,
    ReceiptResolver,
    ReceiptListResolver
  ]
})
export class ReceiptsModule { }
