import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  RateCardApiService,
  RateCardResolver,
  RateCardListResolver,
  RateCardComponent,
  RateCardListComponent,
  RateCardDetailsComponent
} from '.';

@NgModule({
  imports: [
    BaseModule
  ],
  declarations: [
    RateCardComponent,
    RateCardListComponent,
    RateCardDetailsComponent
  ],
  providers: [
    RateCardApiService,
    RateCardResolver,
    RateCardListResolver
  ]
})
export class RateCardModule { }
