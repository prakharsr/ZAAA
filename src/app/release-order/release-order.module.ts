import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

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
    BaseModule
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
