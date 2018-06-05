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
import { ClientPaymentsListResolver } from './client-payments-list-resolver.service';
import { ExecutivePaymentsListResolver } from './executive-payments-list-resolver.service';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NotesListResolver } from './notes-list-resolver.service';
import { InvoiceTaxListResolver } from './invoice-tax-list-resolver.service';

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
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
      {
        path: 'clientinvoicepayments',
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            component: ClientInvoicePaymentsComponent,
            resolve: {
              resolved: ClientPaymentsListResolver
            }
          }
        ]
      },
      {
        path: 'executiveinvoicepayments',
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            component: ExecutiveInvoicePaymentsComponent,
            resolve: {
              resolved: ExecutivePaymentsListResolver
            }
          }
        ]
      },
      {
        path: 'notes',
        children: [
          { path: '', redirectTo: 'mediahouse', pathMatch: 'full' },
          {
            path: 'mediahouse',
            data: {
              mediaHouseNote: true
            },
            children: [
              { path: '', redirectTo: 'list/1', pathMatch: 'full' },
              {
                path: 'list/:page',
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                component: CreditDebitNotesComponent,
                resolve: {
                  resolved: NotesListResolver
                }
              },
              { path: 'new', component: CreateNoteComponent }
            ]
          },
          {
            path: 'client',
            data: {
              clientNote: true
            },
            children: [
              { path: '', redirectTo: 'list/1', pathMatch: 'full' },
              {
                path: 'list/:page',
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                component: CreditDebitNotesComponent,
                resolve: {
                  resolved: NotesListResolver
                }
              },
              { path: 'new', component: CreateNoteComponent }
            ]
          }
        ]
      },
      {
        path: 'gst',
        children: [
          { path: '', redirectTo: 'month', pathMatch: 'full' },
          {
            path: 'month',
            data: {
              monthTax: true
            },
            children: [
              { path: '', redirectTo: 'list/1', pathMatch: 'full' },
              {
                path: 'list/:page',
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                resolve: {
                  resolved: InvoiceTaxListResolver
                },
                component: AccountsGstComponent
              }
            ]
          },
          {
            path: 'client',
            data: {
              clientTax: true
            },
            children: [
              { path: '', redirectTo: 'list/1', pathMatch: 'full' },
              {
                path: 'list/:page',
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                resolve: {
                  resolved: InvoiceTaxListResolver
                },
                component: AccountsGstComponent
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountsRoutingModule { }
