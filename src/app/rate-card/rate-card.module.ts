import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { RateCardRoutingModule } from './rate-card-routing.module';
import { DirectoryModule } from '../directory/directory.module';

import { RateCardApiService } from './rate-card-api.service';
import { RateCardResolver } from './rate-card-resolver.service';

import { RateCardComponent } from './rate-card/rate-card.component';
import { RateCardListComponent } from './rate-card-list/rate-card-list.component';
import { RateCardDetailsComponent } from './rate-card-details/rate-card-details.component';
import { RateCardListResolver } from './rate-card-list-resolver.service';

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
