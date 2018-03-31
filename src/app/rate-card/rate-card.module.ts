import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { RateCardRoutingModule } from './rate-card-routing.module';
import { DirectoryModule } from '../directory/directory.module';

import { RateCardApiService } from './rate-card-api.service';
import { RateCardResolver } from './rate-card-resolver.service';

import { CreateRateCardComponent } from './create-rate-card/create-rate-card.component';
import { RateCardListComponent } from './rate-card-list/rate-card-list.component';
import { RateCardDetailsComponent } from './rate-card-details/rate-card-details.component';

@NgModule({
  imports: [
    BaseModule,
    DirectoryModule,
    RateCardRoutingModule
  ],
  declarations: [
    CreateRateCardComponent,
    RateCardListComponent,
    RateCardDetailsComponent
  ],
  providers: [
    RateCardApiService,
    RateCardResolver
  ]
})
export class RateCardModule { }
