import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards';
import { InvoiceListResolver } from '@aaman/invoice/invoice-list-resolver.service';
import { ReleaseOrderDirResolver } from '@aaman/releaseorder/release-order-dir-resolver.service';
import { InvoiceResolver } from '@aaman/invoice/invoice-resolver.service';

import { InvoiceListComponent } from '@aaman/invoice/invoice-list/invoice-list.component';
import { InvoiceComponent } from '@aaman/invoice/invoice/invoice.component';
import { InvoiceDetailsComponent } from '@aaman/invoice/invoice-details/invoice-details.component';

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
          resolved: ReleaseOrderDirResolver
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
