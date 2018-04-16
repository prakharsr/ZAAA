import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { ReleaseOrderModule } from '../release-order/release-order.module';

import { InvoiceApiService } from './invoice-api.service';

import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  imports: [
    BaseModule,
    ReleaseOrderModule,
    InvoiceRoutingModule
  ],
  declarations: [InvoiceComponent],
  providers: [InvoiceApiService]
})
export class InvoiceModule { }
