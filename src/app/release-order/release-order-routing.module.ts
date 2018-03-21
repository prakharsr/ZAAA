import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReleaseOrderComponent } from './release-order/release-order.component';
import { ReleaseOrderListComponent } from './release-order-list/release-order-list.component';

const routes: Routes = [
  { path: 'releaseorders', component: ReleaseOrderListComponent }
  { path: 'releaseorders/new', component: ReleaseOrderComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ReleaseOrderRoutingModule { }
