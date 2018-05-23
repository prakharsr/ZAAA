import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { DirectoryModule } from '../directory/directory.module';
import { RateCardRoutingModule } from './rate-card-routing.module';

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
    BaseModule,
    DirectoryModule,
    RateCardRoutingModule
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
