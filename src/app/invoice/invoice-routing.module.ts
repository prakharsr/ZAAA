import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.service';
import { ReleaseOrderResolver } from '../release-order/release-order-resolver.service';
import { InvoiceResolver } from './invoice-resolver.service';
import { InvoiceListResolver } from './invoice-list-resolver.service';

import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

const routes: Routes = [
  {
    path: 'invoices',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list/1', pathMatch: 'full' },
      {
        path: 'list/:page',
        component: InvoiceListComponent,
        resolve: {
          resolved: InvoiceListResolver
        }
      },
      {
        path: 'new/:id',
        component: InvoiceComponent,
        resolve: {
          releaseOrder: ReleaseOrderResolver
        }
      },
      {
        path: ':id',
        component: InvoiceDetailsComponent,
        resolve: {
          invoice: InvoiceResolver
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
