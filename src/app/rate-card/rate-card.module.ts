import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { RcCommonModule } from '../rc-common.module';

import { RateCardRoutingModule } from './rate-card-routing.module';

@NgModule({
  imports: [
    BaseModule,
    RcCommonModule,
    RateCardRoutingModule
  ],
  declarations: []
})
export class RateCardModule { }
