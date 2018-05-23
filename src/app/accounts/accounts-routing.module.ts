import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaHouseInvoiceComponent } from '@aaman/accounts/media-house-invoice/media-house-invoice.component';
import { AuthGuard } from '@aaman/main/auth-guard.service';
import { MediaHouseInvoiceListResolver } from '@aaman/accounts/media-house-invoice-list-resolver.service';

const routes: Routes = [
  {
    path: 'accounts',
    canActivate: [AuthGuard],
    children: [
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
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountsRoutingModule { }
