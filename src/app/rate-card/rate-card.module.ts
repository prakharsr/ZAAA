import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { CreateRateCardComponent } from './create-rate-card/create-rate-card.component';
import { RateCardApiService } from './rate-card-api.service';

@NgModule({
  imports: [
    BaseModule
  ],
  declarations: [CreateRateCardComponent],
  providers: [RateCardApiService]
})
export class RateCardModule { }
