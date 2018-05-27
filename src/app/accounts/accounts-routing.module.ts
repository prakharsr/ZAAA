import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards';

import {
  MediaHouseInvoiceComponent,
  MediaHouseInvoiceListResolver,
  AccountsHomeComponent,
  ClientReceiptsComponent,
  ClientInvoicePaymentsComponent,
  ExecutiveInvoicePaymentsComponent,
  CreditDebitNotesComponent,
  AccountsGstComponent
} from '.';

import { FirmResolver, FirmUsersResolver } from 'app/services';
import { ReceiptListResolver } from 'app/receipts';
import { ClientReceiptsListResolver } from './client-receipts-list-resolver.service';

const routes: Routes = [
  {
    path: 'accounts',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AccountsHomeComponent,
        resolve: {
          firm: FirmResolver
        }
      },
      {
        path: 'mediahouseinvoice',
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: MediaHouseInvoiceComponent,
            resolve: {
              resolved: MediaHouseInvoiceListResolver
            }
          }
        ]
      },
      {
        path: 'clientreceipts',
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: ClientReceiptsComponent,
            data: {
              advance: false
            },
            resolve: {
              resolved: ClientReceiptsListResolver,
              users: FirmUsersResolver
            }
          }
        ]
      },
      { path: 'clientinvoicepayments', component: ClientInvoicePaymentsComponent },
      { path: 'executiveinvoicepayments', component: ExecutiveInvoicePaymentsComponent },
      { path: 'creditdebitnotes', component: CreditDebitNotesComponent },
      { path: 'gst', component: AccountsGstComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountsRoutingModule { }
