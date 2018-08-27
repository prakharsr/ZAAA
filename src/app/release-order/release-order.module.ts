import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { DirectoryModule } from 'app/directory/directory.module';
import { RateCardModule } from 'app/rate-card/rate-card.module';

import {
  InsertionListResolver,
  ReleaseOrderListResolver,
  ReleaseOrderResolver,
  ReleaseOrderApiService,
  ReleaseOrderDirResolver,
  InsertionCheckComponent,
  ReleaseOrderComponent,
  ReleaseOrderDetailsComponent,
  ReleaseOrderListComponent,
} from '.';

@NgModule({
  imports: [
    BaseModule,
    DirectoryModule,
    RateCardModule
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
