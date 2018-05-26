import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { ReceiptsModule } from 'app/receipts/receipts.module';
import { AccountsRoutingModule } from './accounts-routing.module';

import {
  AccountsApiService,
  MediaHouseInvoiceComponent,
  MediaHouseInvoiceDialogComponent,
  MediaHouseInvoiceListResolver,
  AccountsHomeComponent,
  ClientReceiptsComponent,
  ClientInvoicePaymentsComponent,
  ExecutiveInvoicePaymentsComponent,
  CreditDebitNotesComponent,
  AccountsGstComponent
} from '.';

@NgModule({
  imports: [
    BaseModule,
    ReceiptsModule,
    AccountsRoutingModule
  ],
  declarations: [
    MediaHouseInvoiceComponent,
    MediaHouseInvoiceDialogComponent,
    AccountsHomeComponent,
    ClientReceiptsComponent,
    ClientInvoicePaymentsComponent,
    ExecutiveInvoicePaymentsComponent,
    CreditDebitNotesComponent,
    AccountsGstComponent
  ],
  entryComponents: [MediaHouseInvoiceDialogComponent],
  providers: [
    AccountsApiService,
    MediaHouseInvoiceListResolver
  ]
})
export class AccountsModule { }
