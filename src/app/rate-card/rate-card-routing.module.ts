import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards';

import {
  RateCardListResolver,
  RateCardResolver,
  RateCardListComponent,
  RateCardComponent,
  RateCardDetailsComponent
} from '.';

const routes: Routes = [
  {
    path: 'ratecards',
    canActivate: [AuthGuard],
    data: {
      global: false
    },
    children: [
      {
        path: 'global',
        data: {
          global: true
        },
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: RateCardListComponent,
            resolve: {
              list: RateCardListResolver
            }
          }    
        ]
      },
      { path: '', redirectTo: 'list/1', pathMatch: 'full' },
      {
        path: 'list/:page',
        component: RateCardListComponent,
        resolve: {
          list: RateCardListResolver
        }
      },
      { path: 'new', component: RateCardComponent },
      {
        path: 'new/:copy',
        component: RateCardComponent,
        resolve: {
          rateCard: RateCardResolver
        }
      },
      {
        path: 'edit/:id',
        component: RateCardComponent,
        resolve: {
          rateCard: RateCardResolver
        }
      },
      {
        path: ':id',
        component: RateCardDetailsComponent,
        resolve: {
          rateCard: RateCardResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RateCardRoutingModule { }
