import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { ReceiptsModule } from '@aaman/receipts/receipts.module';
import { AccountsRoutingModule } from './accounts-routing.module';

import {
  AccountsApiService,
  MediaHouseInvoiceComponent,
  MediaHouseInvoiceDialogComponent
} from '.';

@NgModule({
  imports: [
    BaseModule,
    ReceiptsModule,
    AccountsRoutingModule
  ],
  declarations: [
    MediaHouseInvoiceComponent,
    MediaHouseInvoiceDialogComponent
  ],
  entryComponents: [MediaHouseInvoiceDialogComponent],
  providers: [AccountsApiService]
})
export class AccountsModule { }
