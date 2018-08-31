import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  InvoiceComponent,
  InvoiceDetailsComponent,
  InvoiceListComponent
} from '.';
import { InvoiceRoutingModule } from './invoice-routing.module';

@NgModule({
  imports: [
    BaseModule,
    InvoiceRoutingModule
  ],
  declarations: [
    InvoiceComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent
  ]
})
export class InvoiceModule { }
