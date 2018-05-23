import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { ReceiptsModule } from '@aaman/receipts/receipts.module';
import { AccountsRoutingModule } from '@aaman/accounts/accounts-routing.module';

import { AccountsApiService } from '@aaman/accounts/accounts-api.service';

import { MediaHouseInvoiceComponent } from '@aaman/accounts/media-house-invoice/media-house-invoice.component';
import { MediaHouseInvoiceDialogComponent } from '@aaman/accounts/media-house-invoice-dialog/media-house-invoice-dialog.component';

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
