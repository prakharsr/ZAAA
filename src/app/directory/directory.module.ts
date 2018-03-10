import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { DirRoutingModule } from './dir-routing.module';

import { DirComponent } from './dir/dir.component';

import { ClientApiService } from './clients/client-api.service';
import { DirClientComponent } from './clients/dir-client/dir-client.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';

import { DirExecutiveComponent } from './executives/dir-executive/dir-executive.component';

import { DirMediaHouseComponent } from './media-houses/dir-media-house/dir-media-house.component';
import { ExecutiveApiService } from './executives/executive-api.service';

@NgModule({
  imports: [
    BaseModule,
    DirRoutingModule
  ],
  declarations: [
    DirClientComponent,
    DirExecutiveComponent,
    DirMediaHouseComponent,
    DirComponent,
    ClientListComponent,
    ClientDetailsComponent
  ],
  providers: [
    ClientApiService,
    ExecutiveApiService
  ]
})
export class DirectoryModule { }
