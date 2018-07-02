import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { InvoiceModule } from 'app/invoice/invoice.module';
import { ReceiptsRoutingModule } from './receipts-routing.module';

import {
  ReceiptsApiService,
  ReceiptListResolver,
  ReceiptResolver,
  ReceiptListComponent,
  LinkAdvanceComponent,
  AdvanceReceiptComponent,
  ReceiptComponent,
  ReceiptDetailsComponent
} from '.';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';

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
    LinkAdvanceComponent,
    CreateReceiptComponent
  ],
  providers: [
    ReceiptsApiService,
    ReceiptResolver,
    ReceiptListResolver
  ]
})
export class ReceiptsModule { }
