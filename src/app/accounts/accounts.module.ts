import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { AccountsRoutingModule } from './accounts-routing.module';

import {
  MediaHouseInvoiceComponent,
  MediaHouseInvoiceDialogComponent,
  AccountsHomeComponent,
  ClientReceiptsComponent,
  ClientInvoicePaymentsComponent,
  ExecutiveInvoicePaymentsComponent,
  CreditDebitNotesComponent,
  AccountsGstComponent
} from '.';

import { CreateNoteComponent } from './create-note/create-note.component';
import { SummarySheetComponent } from './summary-sheet/summary-sheet.component';
import { MediaHouseInvoiceListComponent } from './media-house-invoice-list/media-house-invoice-list.component';
import { MediaHouseReceiptComponent } from './media-house-receipt/media-house-receipt.component';
import { PaymentDetailsDialogComponent } from './payment-details-dialog/payment-details-dialog.component';

@NgModule({
  imports: [
    BaseModule,
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
    MediaHouseInvoiceListComponent,
    MediaHouseReceiptComponent,
    PaymentDetailsDialogComponent
  ],
  entryComponents: [
    MediaHouseInvoiceDialogComponent,
    PaymentDetailsDialogComponent
  ]
})
export class AccountsModule { }
