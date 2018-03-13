import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { RateCardRoutingModule } from './rate-card-routing.module';

import { RateCardApiService } from './rate-card-api.service';

import { CreateRateCardComponent } from './create-rate-card/create-rate-card.component';
import { RateCardListComponent } from './rate-card-list/rate-card-list.component';

@NgModule({
  imports: [
    BaseModule,
    RateCardRoutingModule
  ],
  declarations: [CreateRateCardComponent, RateCardListComponent],
  providers: [RateCardApiService]
})
export class RateCardModule { }
