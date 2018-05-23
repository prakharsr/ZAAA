import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards';

import { InsertionListResolver } from '@aaman/releaseorder/insertion-list-resolver.service';
import { ReleaseOrderListResolver } from '@aaman/releaseorder/release-order-list-resolver.service';
import { ReleaseOrderResolver } from '@aaman/releaseorder/release-order-resolver.service';
import { RateCardResolver } from '@aaman/ratecard/rate-card-resolver.service';

import { InsertionCheckComponent } from '@aaman/releaseorder/insertion-check/insertion-check.component';
import { ReleaseOrderListComponent } from '@aaman/releaseorder/release-order-list/release-order-list.component';
import { ReleaseOrderComponent } from '@aaman/releaseorder/release-order/release-order.component';
import { ReleaseOrderDetailsComponent } from '@aaman/releaseorder/release-order-details/release-order-details.component';

const routes: Routes = [
  {
    path: 'releaseorders',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list/1', pathMatch: 'full' },
      {
        path: 'check',
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: InsertionCheckComponent,
            resolve: {
              resolved: InsertionListResolver
            }
          }
        ]
      },
      {
        path: 'list/:page',
        component: ReleaseOrderListComponent,
        resolve: {
          resolved: ReleaseOrderListResolver
        }
      },
      { path: 'new', component: ReleaseOrderComponent },
      {
        path: 'new/:copy',
        component: ReleaseOrderComponent,
        resolve: {
          releaseOrder: ReleaseOrderResolver
        }
      },
      {
        path: 'fromRateCard/:rateCard',
        component: ReleaseOrderComponent,
        resolve: {
          rateCard: RateCardResolver
        }
      },
      {
        path: "edit/:id",
        component: ReleaseOrderComponent,
        resolve: {
          releaseOrder: ReleaseOrderResolver
        }
      },
      {
        path: ':id',
        component: ReleaseOrderDetailsComponent,
        resolve: {
          releaseOrder: ReleaseOrderResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ReleaseOrderRoutingModule { }
