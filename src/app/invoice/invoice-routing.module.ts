import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.service';
import { ReleaseOrderResolver } from '../release-order/release-order-resolver.service';

import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path: 'invoices',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new/:id',
        component: InvoiceComponent,
        resolve: {
          releaseOrder: ReleaseOrderResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class InvoiceRoutingModule { }
