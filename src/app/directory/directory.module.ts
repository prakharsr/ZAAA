import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { DirRoutingModule } from './dir-routing.module';

import { DirComponent } from './dir/dir.component';

import { ClientApiService } from './clients/client-api.service';
import { ClientComponent } from './clients/client/client.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientResolver } from './clients/client-resolver.service';
import { ClientListResolver } from './clients/client-list-resolver.service';

import { ExecutiveApiService } from './executives/executive-api.service';
import { ExecutiveComponent } from './executives/executive/executive.component';
import { ExecutiveListComponent } from './executives/executive-list/executive-list.component';
import { ExecutiveDetailsComponent } from './executives/executive-details/executive-details.component';
import { ExecutiveResolver } from './executives/executive-resolver.service';

import { MediaHouseApiService } from './media-houses/media-house-api.service';
import { MediaHouseComponent } from './media-houses/media-house/media-house.component';
import { MediaHouseListComponent } from './media-houses/media-house-list/media-house-list.component';
import { MediaHouseDetailsComponent } from './media-houses/media-house-details/media-house-details.component';
import { MediaHouseResolver } from './media-houses/media-house-resolver.service';
import { MediaHouseListResolver } from './media-houses/media-house-list-resolver.service';

@NgModule({
  imports: [
    BaseModule,
    DirRoutingModule
  ],
  declarations: [
    ClientComponent,
    ExecutiveComponent,
    MediaHouseComponent,
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
    MediaHouseApiService,
    ClientResolver,
    ExecutiveResolver,
    MediaHouseResolver,
    ClientListResolver,
    MediaHouseListResolver
  ]
})
export class DirectoryModule { }
