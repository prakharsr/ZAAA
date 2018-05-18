import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.service';

import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';

const routes: Routes = [
  {
    path: 'receipts',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list/1', pathMatch: 'full' },
      {
        path: 'list/:page',
        component: ReceiptListComponent
      },
      {
        path: 'new/:id',
        component: ReceiptComponent
      },
      {
        path: ':id',
        component: ReceiptDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ReceiptsRoutingModule { }
