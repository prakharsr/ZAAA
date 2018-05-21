import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { DirRoutingModule } from '@aaman/dir/dir-routing.module';

import { DirComponent } from '@aaman/dir/dir/dir.component';

import { ClientComponent } from '@aaman/dir/clients/client/client.component';
import { ClientListComponent } from '@aaman/dir/clients/client-list/client-list.component';
import { ClientDetailsComponent } from '@aaman/dir/clients/client-details/client-details.component';
import { ClientApiService } from '@aaman/dir/clients/client-api.service';
import { ClientResolver } from '@aaman/dir/clients/client-resolver.service';
import { ClientListResolver } from '@aaman/dir/clients/client-list-resolver.service';

import { ExecutiveComponent } from '@aaman/dir/executives/executive/executive.component';
import { ExecutiveListComponent } from '@aaman/dir/executives/executive-list/executive-list.component';
import { ExecutiveDetailsComponent } from '@aaman/dir/executives/executive-details/executive-details.component';
import { ExecutiveApiService } from '@aaman/dir/executives/executive-api.service';
import { ExecutiveResolver } from '@aaman/dir/executives/executive-resolver.service';
import { ExecutiveListResolver } from '@aaman/dir/executives/executive-list-resolver.service';

import { MediaHouseComponent } from '@aaman/dir/media-houses/media-house/media-house.component';
import { MediaHouseListComponent } from '@aaman/dir/media-houses/media-house-list/media-house-list.component';
import { MediaHouseDetailsComponent } from '@aaman/dir/media-houses/media-house-details/media-house-details.component';
import { MediaHouseApiService } from '@aaman/dir/media-houses/media-house-api.service';
import { MediaHouseResolver } from '@aaman/dir/media-houses/media-house-resolver.service';
import { MediaHouseListResolver } from '@aaman/dir/media-houses/media-house-list-resolver.service';

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
    ExecutiveListResolver,
    MediaHouseListResolver
  ]
})
export class DirectoryModule { }
