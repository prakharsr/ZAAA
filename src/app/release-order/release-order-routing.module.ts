import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReleaseOrderComponent } from './release-order/release-order.component';
import { ReleaseOrderListComponent } from './release-order-list/release-order-list.component';
import { ReleaseOrderDetailsComponent } from './release-order-details/release-order-details.component';

const routes: Routes = [
  {
    path: 'releaseorders',
    children: [
      { path: '', component: ReleaseOrderListComponent },
      { path: 'new', component: ReleaseOrderComponent },
      { path: 'fromRateCard/:rateCard', component: ReleaseOrderComponent },
      { path: "edit/:id", component: ReleaseOrderComponent },
      { path: ':id', component: ReleaseOrderDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ReleaseOrderRoutingModule { }
