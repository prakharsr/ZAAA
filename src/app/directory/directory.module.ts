import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { DirRoutingModule } from './dir-routing.module';

import { DirComponent } from './dir/dir.component';

import { ClientApiService } from './clients/client-api.service';
import { DirClientComponent } from './clients/dir-client/dir-client.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';

import { ExecutiveApiService } from './executives/executive-api.service';
import { DirExecutiveComponent } from './executives/dir-executive/dir-executive.component';
import { ExecutiveListComponent } from './executives/executive-list/executive-list.component';
import { ExecutiveDetailsComponent } from './executives/executive-details/executive-details.component';

import { MediaHouseApiService } from './media-houses/media-house-api.service';
import { DirMediaHouseComponent } from './media-houses/dir-media-house/dir-media-house.component';
import { MediaHouseListComponent } from './media-houses/media-house-list/media-house-list.component';
import { MediaHouseDetailsComponent } from './media-houses/media-house-details/media-house-details.component';

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
    ClientDetailsComponent,
    ExecutiveListComponent,
    ExecutiveDetailsComponent,
    MediaHouseListComponent,
    MediaHouseDetailsComponent
  ],
  providers: [
    ClientApiService,
    ExecutiveApiService,
    MediaHouseApiService
  ]
})
export class DirectoryModule { }
