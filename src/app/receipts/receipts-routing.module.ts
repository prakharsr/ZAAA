import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards';

import { InvoiceResolver, InvoiceDirResolver } from 'app/invoice';

import {
  ReceiptListResolver,
  ReceiptResolver,
  ReceiptListComponent,
  LinkAdvanceComponent,
  AdvanceReceiptComponent,
  ReceiptComponent,
  ReceiptDetailsComponent
} from '.';

const routes: Routes = [
  {
    path: 'receipts',
    canActivate: [AuthGuard],
    data: {
      advance: false
    },
    children: [
      {
        path: 'advance',
        data: {
          advance: true
        },
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: ReceiptListComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              resolved: ReceiptListResolver
            }
          },
          {
            path: 'link/:id',
            children: [
              { path: '', redirectTo: '1', pathMatch: 'full' },
              {
                path: ':page',
                component: LinkAdvanceComponent,
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                resolve: {
                  invoice: InvoiceResolver,
                  resolved: ReceiptListResolver
                }
              }
            ]
          }
        ]
      },
      { path: '', redirectTo: 'list/1', pathMatch: 'full' },
      {
        path: 'list/:page',
        component: ReceiptListComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
          resolved: ReceiptListResolver
        }
      },
      { path: 'new', component: AdvanceReceiptComponent },
      {
        path: 'new/:id',
        component: ReceiptComponent,
        resolve: {
          resolved: InvoiceDirResolver
        }
      },
      {
        path: ':id',
        component: ReceiptDetailsComponent,
        resolve: {
          receipt: ReceiptResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ReceiptsRoutingModule { }
