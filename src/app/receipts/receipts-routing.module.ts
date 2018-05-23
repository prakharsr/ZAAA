import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards';
import { ReceiptListResolver } from '@aaman/receipts/receipt-list-resolver.service';

import { InvoiceResolver, InvoiceDirResolver } from 'app/invoice';

import { ReceiptResolver } from '@aaman/receipts/receipt-resolver.service';

import { ReceiptListComponent } from '@aaman/receipts/receipt-list/receipt-list.component';
import { LinkAdvanceComponent } from '@aaman/receipts/link-advance/link-advance.component';
import { AdvanceReceiptComponent } from '@aaman/receipts/advance-receipt/advance-receipt.component';
import { ReceiptComponent } from '@aaman/receipts/receipt/receipt.component';
import { ReceiptDetailsComponent } from '@aaman/receipts/receipt-details/receipt-details.component';

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
