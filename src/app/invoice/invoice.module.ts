import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { ReleaseOrderModule } from '@aaman/releaseorder/release-order.module';
import { InvoiceRoutingModule } from './invoice-routing.module';

import {
  InvoiceApiService,
  InvoiceResolver,
  InvoiceListResolver,
  InvoiceDirResolver,

  InvoiceComponent,
  InvoiceDetailsComponent,
  InvoiceListComponent
} from '.';

@NgModule({
  imports: [
    BaseModule,
    ReleaseOrderModule,
    InvoiceRoutingModule
  ],
  declarations: [
    InvoiceComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent
  ],
  providers: [
    InvoiceApiService,
    InvoiceResolver,
    InvoiceListResolver,
    InvoiceDirResolver
  ]
})
export class InvoiceModule { }
