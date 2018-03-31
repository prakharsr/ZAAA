import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RateCardListComponent } from './rate-card-list/rate-card-list.component';
import { CreateRateCardComponent } from './create-rate-card/create-rate-card.component';
import { RateCardDetailsComponent } from './rate-card-details/rate-card-details.component';

import { RateCardResolver } from './rate-card-resolver.service';

import { AuthGuard } from '../guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'ratecards',
    canActivate: [AuthGuard],
    children:  [          
      { path: '', component: RateCardListComponent },
      { path: 'new', component: CreateRateCardComponent },
      { path: 'new/:copy', component: CreateRateCardComponent },
      { path: 'edit/:id', component: CreateRateCardComponent },
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
