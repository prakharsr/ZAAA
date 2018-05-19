import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { ReleaseOrderModule } from '../release-order/release-order.module';

import { InvoiceApiService } from './invoice-api.service';
import { InvoiceResolver } from './invoice-resolver.service';
import { InvoiceListResolver } from './invoice-list-resolver.service';

import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDirResolver } from './invoice-dir-resolver.service';

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
