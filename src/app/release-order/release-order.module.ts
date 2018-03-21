import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { ReleaseOrderRoutingModule } from './release-order-routing.module';
import { ReleaseOrderComponent } from './release-order/release-order.component';

@NgModule({
  imports: [
    BaseModule,
    ReleaseOrderRoutingModule
  ],
  declarations: [
    ReleaseOrderComponent
  ]
})
export class ReleaseOrderModule { }
