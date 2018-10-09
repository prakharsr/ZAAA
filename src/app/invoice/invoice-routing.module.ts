import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  InvoiceResolver,
  InvoiceListResolver,

  InvoiceListComponent,
  InvoiceComponent,
  InvoiceDetailsComponent
} from '.';

import { ReleaseOrderDirResolver } from 'app/release-order';
import { FirmResolver } from '../services';
import { CreateInvGuard } from './create-inv-guard.service';
import { InvGuard } from './inv-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [InvGuard],
    children: [
      { path: '', redirectTo: 'list/1', pathMatch: 'full' },
      {
        path: 'list/:page',
        component: InvoiceListComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
          resolved: InvoiceListResolver
        }
      },
      {
        path: 'new/:id',
        component: InvoiceComponent,
        resolve: {
          resolved: ReleaseOrderDirResolver,
          firm: FirmResolver
        },
        canActivate: [CreateInvGuard]
      },
      {
        path: 'new',
        component: InvoiceComponent,
        resolve: {
          firm: FirmResolver
        },
        canActivate: [CreateInvGuard]
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
