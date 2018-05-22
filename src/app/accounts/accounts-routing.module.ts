import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaHouseInvoiceComponent } from '@aaman/accounts/media-house-invoice/media-house-invoice.component';

const routes: Routes = [
  {
    path: 'accounts',
    children: [
      { path: 'mediahouseinvoice', component: MediaHouseInvoiceComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountsRoutingModule { }
