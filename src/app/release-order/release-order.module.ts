import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  InsertionCheckComponent,
  ReleaseOrderComponent,
  ReleaseOrderDetailsComponent,
  ReleaseOrderListComponent,
} from '.';

import { ReleaseOrderRoutingModule } from './release-order-routing.module';

@NgModule({
  imports: [
    BaseModule,
    ReleaseOrderRoutingModule
  ],
  declarations: [
    ReleaseOrderComponent,
    ReleaseOrderListComponent,
    ReleaseOrderDetailsComponent,
    InsertionCheckComponent
  ]
})
export class ReleaseOrderModule { }
