import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { DirectoryModule } from '../directory/directory.module';
import { ReleaseOrderRoutingModule } from './release-order-routing.module';

import { ReleaseOrderApiService } from './release-order-api.service';

import { ReleaseOrderComponent } from './release-order/release-order.component';
import { ReleaseOrderListComponent } from './release-order-list/release-order-list.component';
import { ReleaseOrderDetailsComponent } from './release-order-details/release-order-details.component';
import { RateCardModule } from '../rate-card/rate-card.module';

@NgModule({
  imports: [
    BaseModule,
    DirectoryModule,
    RateCardModule,
    ReleaseOrderRoutingModule
  ],
  providers: [
    ReleaseOrderApiService
  ],
  declarations: [
    ReleaseOrderComponent,
    ReleaseOrderListComponent,
    ReleaseOrderDetailsComponent
  ]
})
export class ReleaseOrderModule { }
