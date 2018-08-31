import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RateCardResolver } from 'app/rate-card';

import {
  InsertionListResolver,
  ReleaseOrderListResolver,
  ReleaseOrderResolver,
  InsertionCheckComponent,
  ReleaseOrderComponent,
  ReleaseOrderDetailsComponent,
  ReleaseOrderListComponent
} from '.';
import { UserProfileResolver, FirmResolver } from '../services';
import { CreateRoGuard } from './create-ro-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'generated', pathMatch: 'full' },
      { path: 'list', redirectTo: 'list/1', pathMatch: 'full' },
      {
        path: 'check',
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: InsertionCheckComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              resolved: InsertionListResolver
            }
          }
        ]
      },
      {
        path: 'generated',
        data: {
          generated: true,
        },
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: ReleaseOrderListComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              resolved: ReleaseOrderListResolver
            }
          }
        ]
      },
      {
        path: 'list/:page',
        component: ReleaseOrderListComponent,
        data: {
          generated: false
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
          resolved: ReleaseOrderListResolver
        }
      },
      {
        path: 'new',
        component: ReleaseOrderComponent,
        resolve: {
          user: UserProfileResolver,
          firm: FirmResolver
        },
        canActivate: [CreateRoGuard]
      },
      {
        path: 'new/:copy',
        component: ReleaseOrderComponent,
        resolve: {
          releaseOrder: ReleaseOrderResolver
        },
        canActivate: [CreateRoGuard]
      },
      {
        path: 'fromRateCard/:rateCard',
        component: ReleaseOrderComponent,
        resolve: {
          rateCard: RateCardResolver
        },
        canActivate: [CreateRoGuard]
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
