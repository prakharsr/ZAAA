import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { ReleaseOrderModule } from '@aaman/releaseorder/release-order.module';
import { InvoiceRoutingModule } from '@aaman/invoice/invoice-routing.module';

import { InvoiceApiService } from '@aaman/invoice/invoice-api.service';
import { InvoiceResolver } from '@aaman/invoice/invoice-resolver.service';
import { InvoiceListResolver } from '@aaman/invoice/invoice-list-resolver.service';
import { InvoiceDirResolver } from '@aaman/invoice/invoice-dir-resolver.service';
import { InvoiceComponent } from '@aaman/invoice/invoice/invoice.component';
import { InvoiceDetailsComponent } from '@aaman/invoice/invoice-details/invoice-details.component';
import { InvoiceListComponent } from '@aaman/invoice/invoice-list/invoice-list.component';

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
