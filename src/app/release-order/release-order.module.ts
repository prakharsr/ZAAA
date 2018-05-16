import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { DirectoryModule } from '../directory/directory.module';
import { RateCardModule } from '../rate-card/rate-card.module';
import { ReleaseOrderRoutingModule } from './release-order-routing.module';

import { ReleaseOrderApiService } from './release-order-api.service';
import { ReleaseOrderResolver } from './release-order-resolver.service';
import { ReleaseOrderListResolver } from './release-order-list-resolver.service';
import { InsertionListResolver } from './insertion-list-resolver.service';
import { ReleaseOrderSearchResolver } from './release-order-search-resolver.service';

import { ReleaseOrderComponent } from './release-order/release-order.component';
import { ReleaseOrderListComponent } from './release-order-list/release-order-list.component';
import { ReleaseOrderDetailsComponent } from './release-order-details/release-order-details.component';
import { InsertionCheckComponent } from './insertion-check/insertion-check.component';

@NgModule({
  imports: [
    BaseModule,
    DirectoryModule,
    RateCardModule,
    ReleaseOrderRoutingModule
  ],
  providers: [
    ReleaseOrderApiService,
    ReleaseOrderResolver,
    ReleaseOrderListResolver,
    InsertionListResolver,
    ReleaseOrderSearchResolver
  ],
  declarations: [
    ReleaseOrderComponent,
    ReleaseOrderListComponent,
    ReleaseOrderDetailsComponent,
    InsertionCheckComponent
  ]
})
export class ReleaseOrderModule { }
