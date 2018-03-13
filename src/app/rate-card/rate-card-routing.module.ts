import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RateCardListComponent } from './rate-card-list/rate-card-list.component';
import { CreateRateCardComponent } from './create-rate-card/create-rate-card.component';
import { RateCardDetailsComponent } from './rate-card-details/rate-card-details.component';

const routes: Routes = [
  {
    path: 'ratecards',
    children:  [          
      { path: '', component: RateCardListComponent },
      { path: 'new', component: CreateRateCardComponent },
      { path: 'edit/:id', component: CreateRateCardComponent },
      { path: ':id', component: RateCardDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RateCardRoutingModule { }
