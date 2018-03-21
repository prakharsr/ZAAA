import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { DirectoryModule } from '../directory/directory.module';
import { ReleaseOrderRoutingModule } from './release-order-routing.module';

import { ReleaseOrderComponent } from './release-order/release-order.component';

@NgModule({
  imports: [
    BaseModule,
    DirectoryModule,
    ReleaseOrderRoutingModule
  ],
  declarations: [
    ReleaseOrderComponent
  ]
})
export class ReleaseOrderModule { }
