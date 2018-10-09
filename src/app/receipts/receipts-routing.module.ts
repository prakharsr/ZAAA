import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceResolver, InvoiceDirResolver } from 'app/invoice';

import {
  ReceiptListResolver,
  ReceiptResolver,
  ReceiptListComponent,
  LinkAdvanceComponent,
  ReceiptDetailsComponent
} from '.';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';
import { UserProfileResolver, FirmResolver } from '../services';
import { CreatePrGuard } from './create-pr-guard.service';

const routes: Routes = [
  {
    path: '',
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
            path: 'new',
            component: CreateReceiptComponent,
            resolve: {
              user: UserProfileResolver,
              firm: FirmResolver
            },
            canActivate: [CreatePrGuard]
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
      {
        path: 'new',
        component: CreateReceiptComponent,
        resolve: {
          user: UserProfileResolver,
          firm: FirmResolver
        },
        canActivate: [CreatePrGuard]
      },
      {
        path: 'new/:id',
        component: CreateReceiptComponent,
        resolve: {
          resolved: InvoiceDirResolver
        },
        canActivate: [CreatePrGuard]
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
