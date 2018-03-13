import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RateCardListComponent } from './rate-card-list/rate-card-list.component';
import { CreateRateCardComponent } from './create-rate-card/create-rate-card.component';

const routes: Routes = [
  {
    path: 'ratecards',
    children:  [          
      { path: '', component: RateCardListComponent },
      { path: 'new', component: CreateRateCardComponent },
      // { path: 'edit/:id', component: DirClientComponent },
      // { path: ':id', component: ClientDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RateCardRoutingModule { }
