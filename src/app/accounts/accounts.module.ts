import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { ReceiptsModule } from 'app/receipts/receipts.module';
import { AccountsRoutingModule } from './accounts-routing.module';

import {
  AccountsApiService,
  MediaHouseInvoiceComponent,
  MediaHouseInvoiceDialogComponent,
  SummarySheetListResolver,
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
import { CreateNoteComponent } from './create-note/create-note.component';
import { NotesListResolver } from './notes-list-resolver.service';
import { InvoiceTaxListResolver } from './invoice-tax-list-resolver.service';
import { SummarySheetComponent } from './summary-sheet/summary-sheet.component';
import { MediaHouseInvoiceListComponent } from './media-house-invoice-list/media-house-invoice-list.component';
import { MediaHouseInvoiceListResolver } from './media-house-invoice-list-resolver.service';

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
    AccountsGstComponent,
    CreateNoteComponent,
    SummarySheetComponent,
    MediaHouseInvoiceListComponent
  ],
  entryComponents: [MediaHouseInvoiceDialogComponent],
  providers: [
    AccountsApiService,
    SummarySheetListResolver,
    ClientReceiptsListResolver,
    ClientPaymentsListResolver,
    ExecutivePaymentsListResolver,
    NotesListResolver,
    InvoiceTaxListResolver,
    MediaHouseInvoiceListResolver
  ]
})
export class AccountsModule { }
