import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { ReleaseOrderModule } from '../release-order/release-order.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceApiService } from './invoice-api.service';

@NgModule({
  imports: [
    CommonModule,
    ReleaseOrderModule,
    InvoiceRoutingModule
  ],
  declarations: [InvoiceComponent],
  providers: [InvoiceApiService]
})
export class InvoiceModule { }
