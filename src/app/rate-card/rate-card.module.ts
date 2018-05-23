import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { DirectoryModule } from '../directory/directory.module';
import { RateCardRoutingModule } from '@aaman/ratecard/rate-card-routing.module';

import { RateCardApiService } from '@aaman/ratecard/rate-card-api.service';
import { RateCardResolver } from '@aaman/ratecard/rate-card-resolver.service';
import { RateCardListResolver } from '@aaman/ratecard/rate-card-list-resolver.service';

import { RateCardComponent } from '@aaman/ratecard/rate-card/rate-card.component';
import { RateCardListComponent } from '@aaman/ratecard/rate-card-list/rate-card-list.component';
import { RateCardDetailsComponent } from '@aaman/ratecard/rate-card-details/rate-card-details.component';

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
