import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  RateCardComponent,
  RateCardListComponent,
  RateCardDetailsComponent
} from '.';

import { RateCardRoutingModule } from './rate-card-routing.module';

@NgModule({
  imports: [
    BaseModule,
    RateCardRoutingModule
  ],
  declarations: [
    RateCardComponent,
    RateCardListComponent,
    RateCardDetailsComponent
  ]
})
export class RateCardModule { }
