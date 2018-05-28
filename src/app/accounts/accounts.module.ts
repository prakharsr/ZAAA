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

import { ClientReceiptsListResolver } from './client-receipts-list-resolver.service';
import { ClientPaymentsListResolver } from './client-payments-list-resolver.service';
import { ExecutivePaymentsListResolver } from './executive-payments-list-resolver.service';

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
    MediaHouseInvoiceListResolver,
    ClientReceiptsListResolver,
    ClientPaymentsListResolver,
    ExecutivePaymentsListResolver
  ]
})
export class AccountsModule { }
