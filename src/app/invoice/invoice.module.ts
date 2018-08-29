import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  InvoiceApiService,
  InvoiceResolver,
  InvoiceListResolver,
  InvoiceDirResolver,

  InvoiceComponent,
  InvoiceDetailsComponent,
  InvoiceListComponent
} from '.';
import { SelectReleaseOrderComponent } from './select-release-order/select-release-order.component';

@NgModule({
  imports: [
    BaseModule
  ],
  declarations: [
    InvoiceComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent,
    SelectReleaseOrderComponent
  ],
  providers: [
    InvoiceApiService,
    InvoiceResolver,
    InvoiceListResolver,
    InvoiceDirResolver
  ],
  entryComponents: [
    SelectReleaseOrderComponent
  ]
})
export class InvoiceModule { }
