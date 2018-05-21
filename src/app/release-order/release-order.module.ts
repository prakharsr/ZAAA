import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { DirectoryModule } from '@aaman/dir/directory.module';
import { RateCardModule } from '@aaman/ratecard/rate-card.module';
import { ReleaseOrderRoutingModule } from '@aaman/releaseorder/release-order-routing.module';

import { ReleaseOrderApiService } from '@aaman/releaseorder/release-order-api.service';
import { ReleaseOrderResolver } from '@aaman/releaseorder/release-order-resolver.service';
import { ReleaseOrderListResolver } from '@aaman/releaseorder/release-order-list-resolver.service';
import { InsertionListResolver } from '@aaman/releaseorder/insertion-list-resolver.service';
import { ReleaseOrderDirResolver } from '@aaman/releaseorder/release-order-dir-resolver.service';

import { ReleaseOrderComponent } from '@aaman/releaseorder/release-order/release-order.component';
import { ReleaseOrderListComponent } from '@aaman/releaseorder/release-order-list/release-order-list.component';
import { ReleaseOrderDetailsComponent } from '@aaman/releaseorder/release-order-details/release-order-details.component';
import { InsertionCheckComponent } from '@aaman/releaseorder/insertion-check/insertion-check.component';

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
    ReleaseOrderDirResolver
  ],
  declarations: [
    ReleaseOrderComponent,
    ReleaseOrderListComponent,
    ReleaseOrderDetailsComponent,
    InsertionCheckComponent
  ]
})
export class ReleaseOrderModule { }
