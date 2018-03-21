import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { DirectoryModule } from '../directory/directory.module';
import { ReleaseOrderRoutingModule } from './release-order-routing.module';

import { ReleaseOrderApiService } from './release-order-api.service';

import { ReleaseOrderComponent } from './release-order/release-order.component';

@NgModule({
  imports: [
    BaseModule,
    DirectoryModule,
    ReleaseOrderRoutingModule
  ],
  providers: [
    ReleaseOrderApiService
  ],
  declarations: [
    ReleaseOrderComponent
  ]
})
export class ReleaseOrderModule { }
