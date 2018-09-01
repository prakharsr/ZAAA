import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  ReceiptListComponent,
  LinkAdvanceComponent,
  AdvanceReceiptComponent,
  ReceiptComponent,
  ReceiptDetailsComponent
} from '.';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';
import { ReceiptsRoutingModule } from './receipts-routing.module';

@NgModule({
  imports: [
    BaseModule,
    ReceiptsRoutingModule
  ],
  declarations: [
    ReceiptComponent,
    ReceiptListComponent,
    ReceiptDetailsComponent,
    AdvanceReceiptComponent,
    LinkAdvanceComponent,
    CreateReceiptComponent
  ]
})
export class ReceiptsModule { }
