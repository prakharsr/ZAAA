import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  InvoiceComponent,
  InvoiceDetailsComponent,
  InvoiceListComponent
} from '.';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { CreateInvGuard } from './create-inv-guard.service';
import { InvGuard } from './inv-guard.service';

@NgModule({
  imports: [
    BaseModule,
    InvoiceRoutingModule
  ],
  declarations: [
    InvoiceComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent
  ],
  providers: [
    CreateInvGuard,
    InvGuard
  ]
})
export class InvoiceModule { }
