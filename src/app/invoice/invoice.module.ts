import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  InvoiceComponent,
  InvoiceDetailsComponent,
  InvoiceListComponent
} from '.';
import { SelectReleaseOrderComponent } from './select-release-order/select-release-order.component';
import { InvoiceRoutingModule } from './invoice-routing.module';

@NgModule({
  imports: [
    BaseModule,
    InvoiceRoutingModule
  ],
  declarations: [
    InvoiceComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent,
    SelectReleaseOrderComponent
  ],
  entryComponents: [
    SelectReleaseOrderComponent
  ]
})
export class InvoiceModule { }
