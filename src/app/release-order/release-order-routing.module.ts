import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReleaseOrderComponent } from './release-order/release-order.component';
import { ReleaseOrderListComponent } from './release-order-list/release-order-list.component';
import { ReleaseOrderDetailsComponent } from './release-order-details/release-order-details.component';

import { AuthGuard } from '../guards/auth-guard.service';
import { ReleaseOrderResolver } from './release-order-resolver.service';
import { RateCardResolver } from '../rate-card/rate-card-resolver.service';
import { ReleaseOrderListResolver } from './release-order-list-resolver.service';
import { InsertionCheckComponent } from './insertion-check/insertion-check.component';
import { InsertionListResolver } from './insertion-list-resolver.service';
import { ReleaseOrderSearchResolver } from './release-order-search-resolver.service';

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
              list: InsertionListResolver
            }
          }
        ]
      },
      {
        path: 'list/:page',
        component: ReleaseOrderListComponent,
        resolve: {
          search: ReleaseOrderSearchResolver,
          list: ReleaseOrderListResolver
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
