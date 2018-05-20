import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.service';
import { ReceiptListResolver } from './receipt-list-resolver.service';
import { InvoiceDirResolver } from '../invoice/invoice-dir-resolver.service';
import { ReceiptResolver } from './receipt-resolver.service';

import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';
import { AdvanceReceiptComponent } from './advance-receipt/advance-receipt.component';

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
